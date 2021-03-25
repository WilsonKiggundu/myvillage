import {Box} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
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

const EventAttachments = ({formField, onDragDrop}: IProps) => {
    const user = useSelector(userSelector)
    const styles = useStyles()
    const classes = globalStyles()

    return (
        <Box mb={2}>
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
        </Box>
    )
}

export default EventAttachments