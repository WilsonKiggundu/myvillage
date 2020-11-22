import React, {createRef, useEffect, useState} from "react"
import {Container} from "@material-ui/core";
import Quill from "quill";

import XForm from "../../components/forms/XForm";
import Grid from "@material-ui/core/Grid";
import XTextInput from "../../components/inputs/XTextInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"

import Box from "@material-ui/core/Box";
import * as yup from "yup";
import {reqString} from "../../data/validations";
import {FormikHelpers} from "formik";

import QuillEditor from "../../utils/quillSettings";

interface IProps {
    placeholder: string
}

const schema = yup.object().shape(
    {
        title: reqString
    }
)

const initialValues = {
    title: ''
}

const AddJob = ({placeholder}: IProps) => {

    let editor: Quill | undefined = undefined
    const [content, setContent] = useState<any>(null)
    const container = createRef<any>()

    useEffect(() => {

        editor = QuillEditor(container, placeholder)

        const delta: any = {
            ops: []
        }

        editor.setContents(delta)
    })

    const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
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
        <Container maxWidth={"md"}>
            <Card>
                <CardContent>
                    <XForm
                        schema={schema}
                        initialValues={initialValues}
                        submitButtonLabel={"Publish"}
                        onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <XTextInput
                                    name={"title"}
                                    helperText={"A catchy title makes your article standout of the crowd"}
                                    label={"Enter the title..."}
                                    variant={"standard"}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Box mt={2}>
                                    <div ref={container}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </XForm>
                </CardContent>
            </Card>
        </Container>
    )
}

export default AddJob