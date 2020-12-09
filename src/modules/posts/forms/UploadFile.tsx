import {FormikHelpers} from "formik";
import React, {useState} from "react";
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {Grid} from "@material-ui/core";
import XForm from "../../../components/forms/XForm";
import {DropzoneArea} from "material-ui-dropzone";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {globalStyles} from "../../../theme/styles";
import XTextInput from "../../../components/inputs/XTextInput";
import {makeUrl, post, postFile, postFileAsync} from "../../../utils/ajax";
import {IUpload} from "../../../interfaces/IUpload";
import {Endpoints} from "../../../services/Endpoints";
import Toast from "../../../utils/Toast";
import {IPost} from "../../../interfaces/IPost";
import {getUser} from "../../../services/User";
import {format} from "date-fns";
import {addPost} from "../postsSlice";
import {unwrapResult} from "@reduxjs/toolkit";

interface IProps {
    done?: () => any
    onClose?: () => any
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
    {}
)

const initialValues = {
    caption: '',
}

const UploadFile = ({done, id, acceptedTypes, onClose}: IProps) => {
    const dispatch = useDispatch()
    const styles = useStyles()
    const classes = globalStyles()

    const user = getUser()
    const [files, setFiles] = useState<any>([])
    // const [uploads, setUploads] = useState<IUpload[]>([])

    const handleDragDrop = (files: any) => {
        setFiles(files)
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        let uploads: IUpload[] = []

        if (files.length) {


            await Promise.all(files.map(async (file: any) => {
                const {body}: any = await postFileAsync(file)

                const upload: IUpload = {
                    contentType: body.attachment_content_type,
                    dateCreated: body.created_at,
                    fileSize: body.attachment_file_size,
                    fileName: body.attachment_file_name,
                    path: Endpoints.cdn.base + body.path,
                    entityId: body.id
                }

                uploads.push(upload)
            }))

            const toSave = {
                details: values.details,
                authorId: user.profile.sub,
                uploads: JSON.stringify(uploads),
            }

            try {
                const resultAction: any = await dispatch(addPost(toSave))
                unwrapResult(resultAction)
            }catch (e) {

            } finally {
                actions.resetForm()
                if (onClose) {
                    onClose()
                }
            }
        }


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
                        useChipsForPreview
                        showAlerts={false}
                        dropzoneClass={classes.dropzone}
                        dropzoneText={"Drag and drop files"}
                        onChange={handleDragDrop}/>
                </Grid>

                <Grid item xs={12}>
                    <XTextInput
                        name={"details"}
                        variant={"standard"}
                        label={"Say something about the photo(s)..."}
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