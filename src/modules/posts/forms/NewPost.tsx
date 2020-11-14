import {FormikHelpers} from "formik";
import React from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {reqString} from "../../../data/validations";
import XForm from "../../../components/forms/XForm";
import Box from "@material-ui/core/Box";
import {DropzoneArea} from "material-ui-dropzone";
import CreateDialog from "../../../components/dialogs/CreateDialog";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {globalStyles} from "../../../theme/styles";
import XTextInput from "../../../components/inputs/XTextInput";
import XTextAreaInput from "../../../components/inputs/XTextAreaInput";

interface IProps {
    done?: () => any
}

const schema = yup.object().shape(
    {
        details: reqString
    }
)

const initialValues = {
    details: '',
}

const NewPost = ({done}: IProps) => {
    const dispatch = useDispatch()

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
            submitButtonLabel={"Post"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>

                <Grid item xs={12}>
                    <XTextAreaInput
                        name={"details"}
                        autoFocus={true}
                        variant={"standard"}
                        label={"What's on your mind?"}
                        helperText={"Press enter / return key to start a new line"}
                        multiline
                        rows={6}
                        rowsMax={12}
                    />
                </Grid>


            </Grid>

        </XForm>
    )
}

export default NewPost