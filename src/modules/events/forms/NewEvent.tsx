import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import Box from "@material-ui/core/Box";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../components/inputs/XDateInput";
import XTimeInput from "../../../components/inputs/XTimeInput";
import {addHours, format} from "date-fns";
import XCheckBoxInput from "../../../components/inputs/XCheckBoxInput";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {IOption} from "../../../components/inputs/inputHelpers";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AttachmentIcon from '@material-ui/icons/Attachment';
import XFileInput from "../../../components/inputs/XFileInput";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import {Options} from "../../../utils/options";
import {IEvent} from "../../../interfaces/IEvent";
import {makeUrl, post} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";
import {useHistory} from "react-router-dom";
import {addEventAction} from "../../../data/customActions";
import {addEvent} from "../eventSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {IPerson} from "../../profiles/people/IPerson";
import {getProfile} from "../../../services/User";
import {IPost} from "../../../interfaces/IPost";
import {addPost} from "../../posts/postsSlice";

interface IProps {
    done?: () => any
    onClose?: () => any
}

const schema = yup.object().shape(
    {
        title: reqString,
        date: reqDate,
        startTime: reqString,
        endTime: reqString
    }
)

const initialValues = {
    details: '',
    date: new Date(),
    startTime: new Date().getTime(),
    endTime: addHours(new Date(), 1).getTime(),
}

const NewEvent = ({done, onClose}: IProps) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const repeatIntervals: IOption[] = [
        {id: 0, name: "Doesn't repeat"},
        {id: 1, name: "Daily"},
        {id: 2, name: "Weekly"},
        {id: 3, name: "Monthly"},
        {id: 4, name: "Annually"},
        {id: 5, name: "Every weekday"},
    ]

    function toggleDuration() {

    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        const startDateTime = format(new Date(values.startTime), "yyyy-MM-dd HH:mm:ss")
        const endDateTime = format(new Date(values.endTime), "yyyy-MM-dd HH:mm:ss")
        const user: IPerson = getProfile()

        const event: IEvent = {
            conferenceUrl: values.conferenceUrl,
            details: values.details,
            interval: 0, // this is hardcoded
            frequency: values.frequency,
            title: values.title,
            type: values.type,
            location: values.location,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            days: [],
            createdBy: user.id
        }

        try {
            await dispatch(addEvent(event))

            // const post = {
            //     authorId: user.id,
            //     type: 5, // 5 = Event
            //     details: `#Upcoming Event\n\n${event.title}\n\n${event.details}`,
            //     dateCreated: format(new Date(), "yyyy-MM-dd HH:mm:ss")
            // }
            //
            // const resultAction: any = await dispatch(addPost(post))
            // unwrapResult(resultAction)
        }catch (e) {

        } finally {
            actions.resetForm()
            if (onClose) {
                onClose()
            }
        }
    }

    return (
        <XForm
            debug={false}
            submitButtonLabel={"Add Event"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XTextInput
                        name={"title"}
                        multiline={false}
                        autoFocus={true}
                        variant={"standard"}
                        placeholder={"Add title"}
                    />
                </Grid>

            </Grid>

            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <XSelectInput
                        label={"Event Type"}
                        name={"type"}
                        options={Options.EVENT_TYPES}
                        variant={"standard"}
                    />
                </Grid>

            </Grid>

            <Grid spacing={2} container>

                <Grid xs={1} item>
                    <Box mt={2}>
                        <AccessTimeIcon/>
                    </Box>
                </Grid>

                <Grid item xs={11}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <XDateInput
                                disableToolbar
                                name={"date"}
                                label={"When is the event?"}
                                multiline={false}
                                autoFocus={false}
                                pickerVariant={"inline"}
                                variant={"standard"}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <XTimeInput
                                name={"startTime"}
                                label={"Start time"}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <XTimeInput
                                name={"endTime"}
                                label={"End time"}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <XCheckBoxInput
                                onChange={toggleDuration}
                                name={"allDay"}
                                label={"All day"}
                            />
                        </Grid>
                    </Grid>

                    {/*<Grid container>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        <XSelectInput*/}
                    {/*            variant={"standard"}*/}
                    {/*            name={"frequency"}*/}
                    {/*            label={"Repeat interval"}*/}
                    {/*            options={repeatIntervals}*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>

            </Grid>


            <Grid container spacing={2}>

                <Grid item xs={1}>
                    <Box mt={5}>
                        <FormatAlignLeftIcon/>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <XTextAreaInput
                        variant={"standard"}
                        name={"details"}
                        label={"Add description"}
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2}>

                <Grid item xs={1}>
                    <Box mt={1}>
                        <AttachmentIcon/>
                    </Box>
                </Grid>

                <Grid item xs={11}>
                    <XFileInput name={"attachments"} />
                </Grid>

            </Grid>

            <Grid container>

                <Grid item xs={1}>
                    <Box mt={5}>
                        <AddLocationIcon style={{color: red[700]}} />
                    </Box>
                </Grid>

                <Grid item xs={11}>
                    <XTextInput
                        variant={"standard"}
                        helperText={'Ex. Google map pin'}
                        name={"location"}
                        label={"Add location"}
                    />
                </Grid>

            </Grid>

            <Grid container>

                <Grid item xs={1}>
                    <Box mt={5}>
                        <VideoCallIcon style={{color: green[700]}} />
                    </Box>
                </Grid>

                <Grid item xs={11}>
                    <XTextInput
                        variant={"standard"}
                        helperText={'Ex. Zoom link, Google Meet'}
                        name={"conferenceUrl"}
                        label={"Add a link to video call"}
                    />
                </Grid>

            </Grid>


        </XForm>
    )
}

export default NewEvent