import React, {createRef, useEffect} from "react"
import {Container} from "@material-ui/core";
import XForm from "../../components/forms/XForm";
import Grid from "@material-ui/core/Grid";
import XTextInput from "../../components/inputs/XTextInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Box from "@material-ui/core/Box";
import * as yup from "yup";
import {reqString} from "../../data/validations";
import {FormikHelpers} from "formik";
import XTextAreaInput from "../../components/inputs/XTextAreaInput";

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

const NewArticle = ({placeholder}: IProps) => {

    // let editor: Quill | undefined = undefined
    const container = createRef<any>()

    useEffect(() => {

        // const toolbarOptions = [
        //     [{'header': [1, 2, 3, 4, 5, 6, false]}],
        //     ['bold', 'italic', 'underline', 'strike'],
        //     ['blockquote', 'code-block'],
        //
        //     [{'list': 'ordered'}, {'list': 'bullet'}],
        //     [{'script': 'sub'}, {'script': 'super'}],
        //     [{'indent': '-1'}, {'indent': '+1'}],
        //
        //     [{'align': []}],
        // ];

        // editor = new Quill(container.current, {
        //     theme: 'snow',
        //     placeholder: placeholder,
        //     readOnly: false,
        //     formats: [
        //         'header', 'underline', 'strike', 'blockquote', 'code-block',
        //         'bold', 'italic', 'list', 'script', 'indent', 'align'
        //     ],
        //     modules: {
        //         toolbar: toolbarOptions
        //     }
        // })
        //
        // const delta: any = {
        //     ops: []
        // }
        //
        // editor.setContents(delta)
    })

    const handleSubmit = (values: any, actions: FormikHelpers<any>) => {

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
                                    <XTextAreaInput
                                        name={"details"}
                                        label={"Details"}
                                        placeholder={"Start typing here..."}
                                        />
                                </Box>
                            </Grid>
                        </Grid>
                    </XForm>
                </CardContent>
            </Card>
        </Container>
    )
}

export default NewArticle