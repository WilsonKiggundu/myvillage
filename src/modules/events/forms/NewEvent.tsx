import {FormikHelpers} from "formik";
import React, {useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import Box from "@material-ui/core/Box";
import {DropzoneArea} from "material-ui-dropzone";
import CreateDialog from "../../../components/dialogs/CreateDialog";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {globalStyles} from "../../../theme/styles";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../components/inputs/XDateInput";
import XTimeInput from "../../../components/inputs/XTimeInput";
import {addHours, format} from "date-fns";
import XCheckBoxInput from "../../../components/inputs/XCheckBoxInput";
import XSelectDropdown from "../../../components/inputs/XSelectDropdown";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {IOption} from "../../../components/inputs/inputHelpers";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import AttachmentIcon from '@material-ui/icons/Attachment';
import XFileInput from "../../../components/inputs/XFileInput";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

interface IProps {
    done?: () => any
}

const schema = yup.object().shape(
    {
        name: reqString,
        date: reqDate,
        startTime: reqString,
        endTime: reqString
    }
)

const initialValues = {
    details: '',
    date: new Date(),
    interval: 0,
    startTime: new Date().getTime(),
    endTime: addHours(new Date(), 1).getTime()
}

const NewEvent = ({done}: IProps) => {
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

    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave = {}

        // post('', toSave,
        //     (data) => {
        //         Toast.info("Your profile has been updated successfully")
        //         actions.resetForm()
        //         dispatch({
        //             type: '',
        //             payload: {...data}
        //         })
        //         if (done) {
        //             done()
        //         }
        //     },
        //     () => Toast.error("Unable to update your profile. Please try again later"),
        //     () => {
        //         actions.setSubmitting(false)
        //     }
        // )
    }

    return (
        <XForm
            submitButtonLabel={"Add Event"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>
                <Grid item xs={1}></Grid>
                <Grid item xs={11}>
                    <XTextInput
                        name={"name"}
                        multiline={false}
                        autoFocus={true}
                        variant={"standard"}
                        placeholder={"Add title"}
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

                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <XSelectInput
                                variant={"standard"}
                                name={"interval"}
                                label={"Repeat interval"}
                                options={repeatIntervals}
                            />
                        </Grid>
                    </Grid>
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
                        name={"description"}
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
                        name={"video_link"}
                        label={"Add a link to video call"}
                    />
                </Grid>

            </Grid>


        </XForm>
    )
}

export default NewEvent