import {Box, Theme} from "@material-ui/core";
import React from "react";
import {globalStyles} from "../theme/styles";
import {DropzoneArea} from "material-ui-dropzone";
import {createStyles, createMuiTheme} from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface IProps {
    onDragDrop: any
    filesLimit?: number
    dropzoneText?: string
    acceptedTypes?: string[]
    showPreviews?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        previewContainer: {
            margin: '5px 5px 0 0',
            width: '100%'
        },
        previewItem: {}
    }),
);

export default function XDragAndDrop({showPreviews, dropzoneText, filesLimit, acceptedTypes, onDragDrop}: IProps){

    const styles = useStyles()
    const classes = globalStyles()

    return (
        <Box mb={2}>
            <DropzoneArea
                acceptedFiles={acceptedTypes}
                showPreviews={showPreviews}
                previewText={""}
                filesLimit={filesLimit}
                previewGridClasses={{
                    container: styles.previewContainer,
                    item: styles.previewItem,
                }}
                showPreviewsInDropzone={false}
                showFileNamesInPreview={false}
                useChipsForPreview={true}
                showAlerts={true}
                dropzoneClass={classes.dropzone}
                dropzoneText={dropzoneText ?? "Drag and drop files"}
                onChange={onDragDrop}/>
        </Box>
    )
}