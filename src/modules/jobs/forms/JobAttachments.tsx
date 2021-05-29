import {Box, Card, CardContent, CardHeader, Divider, Grid} from "@material-ui/core";
import XTextInput from "../../../components/inputs/XTextInput";
import XSelectInputAsync from "../../../components/inputs/XSelectInputAsync";
import {Endpoints} from "../../../services/Endpoints";
import XSelectInput from "../../../components/inputs/XSelectInput";
import {countries} from "../../../data/Countries";
import {ICountry} from "../../../interfaces/ICountry";
import React from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import XFileInput from "../../../components/inputs/XFileInput";
import UploadFile from "../../posts/forms/UploadFile";
import {DropzoneArea} from "material-ui-dropzone";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {globalStyles} from "../../../theme/styles";

interface IProps {
    formField: any
    onDragDrop: any
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

const JobAttachments = ({formField, onDragDrop}: IProps) => {
    const user = useSelector(userSelector)
    const styles = useStyles()
    const classes = globalStyles()

    return (
        <Box mb={2}>
            <Card>
                <CardHeader title={"Attachments"}
                    subheader={"You can attach any documents, files that are relevant to the job."}
                />
                <Divider />
                <CardContent>
                    <DropzoneArea
                        // acceptedFiles={acceptedTypes}
                        showPreviews={true}
                        previewText={""}
                        filesLimit={4}
                        previewGridClasses={{
                            container: styles.previewContainer,
                            item: styles.previewItem,
                        }}
                        showPreviewsInDropzone={false}
                        showFileNamesInPreview={false}
                        useChipsForPreview={false}
                        showAlerts={false}
                        dropzoneClass={classes.dropzone}
                        dropzoneText={"Drag and drop files"}
                        onChange={onDragDrop}/>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobAttachments