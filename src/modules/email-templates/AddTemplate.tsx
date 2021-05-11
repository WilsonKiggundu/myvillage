import React from "react";
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
import InitialValues from "./models/InitialValues";
import {Form, Formik} from "formik";
import XTextInput from "../../components/inputs/XTextInput";
import XSelectInputCreatable from "../../components/inputs/XSelectInputCreatable";
import {Options} from "../../utils/options";
import XRichTextArea from "../../components/inputs/XRichTextArea";
import ValidationSchema from "../jobs/models/ValidationSchema";
import {makeUrl, postWithoutLoginAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";

const AddEmailTemplate = () => {

    const currentValidationSchema = ValidationSchema[0];

    const handleSubmit = async (values: any, actions: any) => {
        const url = makeUrl("Profiles", Endpoints.templates.email)

        const template = {
            subject: values.subject,
            type: values.type.id,
            body: values.body
        }
        postWithoutLoginAsync(url, template)
            .then((response: any) => {
                Toast.success("Added successfully")
            })
    }

    return (
        <Container maxWidth={"md"}>
            <Formik
                initialValues={InitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form id="create-event-form">
                        <Box mb={2}>
                            <Card>
                                <CardHeader title="Add Email Template"/>
                                <Divider/>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <XSelectInputCreatable
                                                helperText={"What type of event is it? You can add any option if it does not exist"}
                                                label={"Email Type"}
                                                name={"type"}
                                                allowAddNew
                                                options={Options.EMAIL_TYPES}
                                                variant={"outlined"}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <XTextInput
                                                name={"subject"}
                                                multiline={false}
                                                variant={"outlined"}
                                                label={"Email subject"}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className="event-form-label">
                                                Email body
                                            </div>
                                            <XRichTextArea
                                                variant={"standard"}
                                                name={"body"}
                                                label={"Email body"}
                                            />
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
                                                        disableElevation
                                                        variant={"contained"}
                                                        color={"secondary"}>
                                                        Create template
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

export default AddEmailTemplate