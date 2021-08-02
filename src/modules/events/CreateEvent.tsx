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
import XTimeInput from "../../components/inputs/XTimeInput";

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
        // actions.setSubmitting(true)

        // upload the files if any is attached
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
        const startTime = format(new Date(values.startTime), 'HH:mm')
        const endTime = format(new Date(values.endTime), 'HH:mm')

        const event = {
            title: values.title,
            type: values.type.id,
            location: values.location.name,
            partner: values.partner.id,
            category: values.category.name,
            objective: values.objective.name,
            region: values.region.map((r: any) => r.id).join(','),
            sector: values.sector.name,
            tivAffiliation: values.tiv_affiliation.id === "yes",
            details: values.details,
            frequency: "1",
            interval: "0",
            createdBy: user.profile.sub,
            startDateTime: `${date}T${startTime}:00`,
            endDateTime: `${date}T${endTime}:00`,
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
                                <CardHeader subheader={"All fields are required unless indicated otherwise"}
                                            title="Create an event"/>
                                <Divider/>
                                <CardContent>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <XTextInput
                                                name={"title"}
                                                helperText={"Give your event a descriptive name so that it can easily be found"}
                                                multiline={false}
                                                variant={"outlined"}
                                                placeholder={"Enter the title"}
                                                label={"Event title"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                // multiple
                                                variant={"outlined"}
                                                options={Options.EVENT_OBJECTIVE}
                                                name={"objective"}
                                                label={"Objective"}
                                                placeholder={"What's the objective of the event?"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                helperText={"Optional"}
                                                label={"Event Category"}
                                                placeholder={"What kind of event is it?"}
                                                name={"category"}
                                                options={Options.EVENT_CATEGORIES}
                                                variant={"outlined"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                helperText={"You can add any option if it does not exist"}
                                                label={"Event Type"}
                                                placeholder={"What type of event is it?"}
                                                name={"type"}
                                                options={Options.EVENT_TYPES}
                                                variant={"outlined"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                placeholder={"Where is the event happening?"}
                                                variant={"outlined"}
                                                helperText={'You can type any location'}
                                                allowAddNew
                                                options={Options.EVENT_LOCATIONS}
                                                name={"location"}
                                                label={"Location"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                label={"TIV Affiliation"}
                                                variant={"outlined"}
                                                options={Options.YES_NO}
                                                name={"tiv_affiliation"}
                                                helperText={"Is this event affiliated to Innovation Village or MoTIV?"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                placeholder={"Select or add partner"}
                                                allowAddNew
                                                variant={"outlined"}
                                                helperText={'Specify the implementing partner. Optional'}
                                                options={Options.IMPLEMENTING_PARTNERS}
                                                name={"partner"}
                                                label={"Implementing Partner"}

                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                multiple
                                                variant={"outlined"}
                                                options={Options.REGIONS}
                                                name={"region"}
                                                label={"Region"}
                                                helperText={"Specify in which region the event is taking place"}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <XSelectInputCreatable
                                                // multiple
                                                allowAddNew
                                                variant={"outlined"}
                                                options={Options.EVENT_SECTORS}
                                                name={"sector"}
                                                label={"Sector"}
                                                helperText={"Ex. Information Technology"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <XDateInput
                                                disablePast
                                                name={"date"}
                                                placeholder={"Event date"}
                                                helperText={"When is the event?"}
                                                multiline={false}
                                                autoFocus={false}
                                                pickerVariant={"dialog"}
                                                variant={"outlined"}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>

                                            <XTimeInput helperText={"What time does the event start?"}
                                                        disablePast
                                                        variant={"outlined"}
                                                        placeholder={"Start time"}
                                                        name={"startTime"}/>
                                        </Grid>

                                        <Grid item xs={6}>

                                            <XTimeInput helperText={"What time does the event end?"}
                                                        placeholder={"End time"}
                                                        variant={"outlined"}
                                                        name={"endTime"}/>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className="event-form-label">
                                                Description / Agenda
                                            </div>
                                            <XRichTextArea
                                                variant={"standard"}
                                                name={"details"}
                                                label={"Event description"}
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

                                <Box mt={4} mb={4} ml={2} mr={2}>
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
                                                        disableElevation
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