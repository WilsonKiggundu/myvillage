import {FormikHelpers} from "formik";
import React, {useState} from "react";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
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
import {getPerson, selectPerson, updatePerson} from "../../profiles/people/personSlice";
import {IPerson} from "../../profiles/people/IPerson";
import {selectStartup, updateStartup} from "../../profiles/startups/startupSlice";
import {on} from "cluster";

interface IProps {
    done?: () => any
    onClose?: () => any
    id?: string
    acceptedTypes?: any
    filesLimit?: number
    type?: UploadType
    category?: UploadCategory
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

type UploadType = 'coverPhoto' | 'profilePhoto' | 'other'
type UploadCategory = 'person' | 'startup'

const UploadFile = ({done, id, type, category, filesLimit, acceptedTypes, onClose}: IProps) => {
    const dispatch = useDispatch()
    const styles = useStyles()
    const classes = globalStyles()

    const person = useSelector(selectPerson)
    const startup = useSelector(selectStartup)

    const [files, setFiles] = useState<any>([])
    const captionPlaceholder = filesLimit === 1 ?
        "Say something about the photo..." :
        "Say something about the photo(s)..."

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

                if (type){
                    const profile: any = category === "person" ? {...person} : {...startup}

                    switch (type) {
                        case "coverPhoto":
                            profile.coverPhoto = upload.path
                            break
                        case "profilePhoto":
                            profile.avatar = upload.path
                            break
                    }

                    switch (category){
                        case "person":
                            await dispatch(updatePerson(profile))
                            break
                        case "startup":
                            await dispatch(updateStartup(profile))
                            break
                    }

                }

            }))

            actions.resetForm()
            if (onClose) onClose()

            // const toSave = {
            //     details: type ? "#NewProfilePhoto" : values.details,
            //     authorId: user.profile.sub,
            //     uploads: JSON.stringify(uploads),
            // }
            //
            // try {
            //     const resultAction: any = await dispatch(addPost(toSave))
            //     unwrapResult(resultAction)
            // }catch (e) {
            //
            // } finally {
            //     actions.resetForm()
            //     if (onClose) {
            //         onClose()
            //     }
            // }
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
                        filesLimit={filesLimit}
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
                        label={captionPlaceholder}
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