import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import VideocamIcon from "@material-ui/icons/Videocam";
import EventIcon from "@material-ui/icons/Event";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "@material-ui/core/Card";
import React, {useState} from "react";
import {globalStyles} from "../theme/styles";
import CreateDialog from "./dialogs/CreateDialog";
import useTheme from "@material-ui/core/styles/useTheme";
import {DropzoneArea} from "material-ui-dropzone";
import {TextField} from "@material-ui/core";

interface IProps {
    placeholder: string
}

type DialogType = 'uploadPhoto' | 'uploadVideo'

const StartAPostCard = (props: IProps) => {
    const classes = globalStyles()
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false);

    const handleOpenDialog = (dialog: DialogType) => {
        switch (dialog) {
            case "uploadPhoto":
                setOpenPhotoDialog(true)
                break;
        }
    }

    const handleCloseDialog = (dialog: DialogType) => {
        switch (dialog) {
            case "uploadPhoto":
                setOpenPhotoDialog(false)
                break;
        }
    }

    const handleDragDrop = () => {

    }

    return (
        <Box mb={2}>
            <Card>
                <CardContent>
                    <Typography
                        component={"div"}
                        style={{
                            textAlign: 'left',
                            padding: 25,
                            borderRadius: 5
                        }}
                        className={clsx(classes.fullWidth, classes.clickable)}>
                        {props.placeholder}
                    </Typography>

                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    onClick={() => handleOpenDialog('uploadPhoto')}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <AddAPhotoIcon style={{marginRight: 10}}/> Photo
                                </Button>

                                <CreateDialog
                                    submitButtonLabel={"Upload"}
                                    onClose={() => handleCloseDialog("uploadPhoto")}
                                    onSubmit={() => {}}
                                    title={"Upload a photo"}
                                    open={openPhotoDialog}>

                                    <Box mb={2}>
                                        <TextField
                                            autoFocus={true}
                                            className={classes.fullWidth}
                                            placeholder={"Say something about the photos"}
                                            multiline
                                            rowsMax={4}
                                        />
                                    </Box>

                                    <DropzoneArea acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                                  showPreviews={true}
                                                  showPreviewsInDropzone={false}
                                                  showFileNamesInPreview={true}
                                                  dropzoneClass={classes.dropzone}
                                                  dropzoneText={"Drag and drop files"}
                                                  onChange={handleDragDrop} />
                                </CreateDialog>
                            </Grid>

                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    style={{padding: 5}} className={clsx(classes.bold, classes.fullWidth)}>
                                    <VideocamIcon style={{marginRight: 10}}/> Video
                                </Button>
                            </Grid>

                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    style={{padding: 5}} className={clsx(classes.bold, classes.fullWidth)}>
                                    <EventIcon style={{marginRight: 10}}/> Event
                                </Button>
                            </Grid>

                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <DescriptionIcon style={{marginRight: 10}}/> Write article
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    )
}

export default StartAPostCard