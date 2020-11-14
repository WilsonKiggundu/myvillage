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

interface IProps {
    done?: () => any
    id?: string
    acceptedTypes?: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        previewContainer: {
            margin: 5,
            width: '100%'
        },
        previewItem: {}
    }),
);

const schema = yup.object().shape(
    {

    }
)

const initialValues = {
    caption: '',
}

const UploadFile = ({done, id, acceptedTypes}: IProps) => {
    const dispatch = useDispatch()
    const styles = useStyles()
    const classes = globalStyles()

    const handleDragDrop = () => {

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
            submitButtonLabel={"Upload"}
            schema={schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            <Grid spacing={2} container>

                <Grid item xs={12}>
                    <DropzoneArea
                        acceptedFiles={acceptedTypes}
                        showPreviews={true}
                        previewText={""}
                        previewGridClasses={{
                            container: styles.previewContainer,
                            item: styles.previewItem,
                        }}
                        showPreviewsInDropzone={false}
                        showFileNamesInPreview={false}
                        dropzoneClass={classes.dropzone}
                        dropzoneText={"Drag and drop files"}
                        onChange={handleDragDrop}/>
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        name={"caption"}
                        variant={"standard"}
                        label={"Add a caption"}
                        multiline
                        rows={2}
                        rowsMax={4}
                    />
                </Grid>


            </Grid>

        </XForm>
    )
}

export default UploadFile