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
import {postFileAsync} from "../../../utils/ajax";
import {IUpload} from "../../../interfaces/IUpload";
import {Endpoints} from "../../../services/Endpoints";
import {userSelector} from "../../../data/coreSelectors";
import {addPost} from "../redux/postsActions";
import Toast from "../../../utils/Toast";
import {startupSelector} from "../../profiles/startups/redux/startupsSelectors";
import {editStartup} from "../../profiles/startups/redux/startupsActions";
import {editPerson} from "../../profiles/people/redux/peopleActions";

interface IProps {
    done?: () => any
    onClose?: () => any
    id?: string
    acceptedTypes?: any
    filesLimit?: number
    type?: UploadType
    category?: UploadCategory
    addToFeed?: boolean
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

export type UploadType = 'coverPhoto' | 'profilePhoto' | 'other'
type UploadCategory = 'person' | 'startup'

const UploadFile = ({done, id, type, addToFeed, category, filesLimit, acceptedTypes, onClose}: IProps) => {
    const dispatch = useDispatch()
    const styles = useStyles()
    const classes = globalStyles()

    const user = useSelector(userSelector)
    const startup = useSelector((state) => startupSelector(state, id))

    const [files, setFiles] = useState<any>([])
    const captionPlaceholder = filesLimit === 1 ?
        "Say something about the photo..." :
        "Say something about the photo(s)..."


    const [loading, setLoading] = useState<boolean>(true)

    const handleDragDrop = (files: any) => {
        if (files.length) {
            setLoading(false)
        }
        setFiles(files)
    }

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {

        let uploads: IUpload[] = []
        setLoading(true)

        if (files.length) {

            Promise.all(files.map(async (file: any) => {
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

                if (type) {
                    const profile: any =
                        category === "person" ?
                            { userId: user.profile.sub } :
                            { id: startup?.id }

                    type === "coverPhoto" ?
                        profile.coverPhoto = upload.path :
                        profile.avatar = upload.path

                    category === "person" ?
                        dispatch(editPerson(profile, type)) :
                        dispatch(editStartup(profile, type))

                }

            }))
                .then(() => {
                    if (addToFeed && values.details) {
                        const post = {
                            details: values.details ?? "",
                            authorId: user.profile.sub,
                            uploads: uploads.length ? JSON.stringify(uploads) : ""
                        }

                        dispatch(addPost(post))
                    }

                    actions.resetForm()
                    if (onClose) onClose()
                })
                .catch(error => {
                    Toast.error(error.message)
                    setLoading(false)
                })
        } else {
            Toast.error("Please select photos to upload.")
        }

    }

    return (
        <XForm
            submitButtonLabel={"Upload"}
            schema={schema}
            loading={loading}
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