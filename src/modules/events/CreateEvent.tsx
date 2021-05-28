import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Divider,
    Grid
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import EventInitialValues from "./models/EventInitialValues";
import {Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {IUpload} from "../../interfaces/IUpload";
import {postFileAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import EventValidationSchema from "./models/EventValidationSchema";
import EventModel from "./models/EventModel";
import EventAttachments from "./forms/EventAttachments";
import XTextInput from "../../components/inputs/XTextInput";
import {Options} from "../../utils/options";
import XDateInput from "../../components/inputs/XDateInput";
import XSelectInputCreatable from "../../components/inputs/XSelectInputCreatable";
import XRichTextArea from "../../components/inputs/XRichTextArea";

import './CreateEvent.css'
import {IOption} from "../../components/inputs/inputHelpers";
import {format, parseISO} from "date-fns";
import {Urls} from "../../routes/Urls";
import Toast from "../../utils/Toast";
import {postEvent} from "./redux/eventsEndpoints";

const CreateEvent = () => {

    const user = useSelector(userSelector)
    const {formId, formField} = EventModel
    const dispatch = useDispatch()

    const currentValidationSchema = EventValidationSchema[0];
    const [files, setFiles] = useState<any>([])
    const timeOptions: IOption[] = []

    useEffect(() => {
        for (let h = 0; h < 24; h++) {

            let hour

            if (h < 10) {
                hour = `0${h}`
            } else {
                hour = h
            }

            timeOptions.push({
                id: `${hour}:00`,
                name: `${hour}:00`
            })

            timeOptions.push({
                id: `${hour}:15`,
                name: `${hour}:15`
            })

            timeOptions.push({
                id: `${hour}:30`,
                name: `${hour}:30`
            })

            timeOptions.push({
                id: `${hour}:45`,
                name: `${hour}:45`
            })

        }
    })

    const handleSubmit = async (values: any, actions: any) => {
        actions.setSubmitting(true)

        // upload the files
        let uploads: IUpload[] = []
        if (files.length) {
            await Promise.all(files.map(async (file: any) => {
                const {body}: any = await postFileAsync(file)
                const upload: any = {
                    name: body.attachment_file_name,
                    path: Endpoints.cdn.base + body.path
                }
                uploads.push(upload)
            }))
        }

        const date = format(parseISO(values.date), 'yyyy-MM-dd')

        const event = {
            title: values.title,
            type: values.type.name,
            location: values.location,
            details: values.details,
            conferenceUrl: values.conferenceUrl,
            frequency: values.frequency,
            createdBy: user.profile.sub,
            startDateTime: `${date}T${values.startTime.id}:00`,
            endDateTime: `${date}T${values.endTime.id}:00`,
            uploads: uploads
        }

        postEvent(event)
            .then((response: any) => {
                Toast.success("Event added successfully")
                window.location.replace(Urls.events)
            })
            .catch(error => Toast.error("Error while adding event"));

    }

    const handleDragDrop = (files: any) => {
        if (files.length) {
            setFiles(files)
        }
    }


    return (
        <Container maxWidth={"md"}>
            <Formik
                initialValues={EventInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form id="create-event-form">
                        <Box mb={2}>
                            <Card>
                                <CardHeader title="Add event"/>
                                <Divider/>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <XTextInput
                                                name={"title"}
                                                helperText={"Give your event a descriptive name so that it can easily be found"}
                                                multiline={false}
                                                variant={"outlined"}
                                                label={"Event title"}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <XSelectInputCreatable
                                                helperText={"What type of event is it? You can add any option if it does not exist"}
                                                label={"Event Type"}
                                                name={"type"}
                                                allowAddNew
                                                options={Options.EVENT_TYPES}
                                                variant={"outlined"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <XDateInput
                                                disableToolbar
                                                disablePast
                                                name={"date"}
                                                label={"Event date"}
                                                helperText={"When is the event?"}
                                                multiline={false}
                                                autoFocus={false}
                                                pickerVariant={"inline"}
                                                variant={"outlined"}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <XSelectInputCreatable
                                                options={timeOptions}
                                                name={"startTime"}
                                                variant={"outlined"}
                                                helperText={"What time does the event start?"}
                                                allowAddNew
                                                label={"Start time"}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <XSelectInputCreatable
                                                options={timeOptions}
                                                name={"endTime"}
                                                allowAddNew
                                                helperText={"And when does it end?"}
                                                variant={"outlined"}
                                                label={"End time"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <XTextInput
                                                variant={"outlined"}
                                                helperText={'You can use a Google map pin'}
                                                name={"location"}
                                                label={"Event location"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className="event-form-label">
                                                Add description
                                            </div>
                                            <XRichTextArea
                                                variant={"standard"}
                                                name={"details"}
                                                label={"Event description"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <XTextInput
                                                variant={"outlined"}
                                                helperText={'Ex. Zoom link, Google Meet'}
                                                name={"conferenceUrl"}
                                                label={"Add a link to video call"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className="event-form-label">
                                                Attachments
                                            </div>
                                            <EventAttachments formField={formField} onDragDrop={handleDragDrop}/>
                                        </Grid>

                                    </Grid>

                                </CardContent>

                                <Divider/>

                                <Box mt={2} mb={2} ml={2} mr={2}>
                                    <Grid spacing={2} container justify={"center"}>
                                        <Grid item>
                                            <Button variant={"outlined"} color={"default"}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            {
                                                isSubmitting ?
                                                    <CircularProgress variant={"indeterminate"}/> :
                                                    <Button
                                                        type={"submit"}
                                                        variant={"contained"}
                                                        color={"secondary"}>
                                                        Create event
                                                    </Button>
                                            }

                                        </Grid>
                                    </Grid>
                                </Box>
                            </Card>
                        </Box>
                    </Form>
                )}
            </Formik>

        </Container>
    )
}

export default CreateEvent