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
import {DropzoneArea} from "material-ui-dropzone";
import {TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import XDialog from "./dialogs/XDialog";
import UploadFile from "../modules/posts/forms/UploadFile";
import NewPost from "../modules/posts/forms/NewPost";
import NewEvent from "../modules/events/forms/NewEvent";
import {Urls} from "../routes/Urls";

interface IProps {
    placeholder: string
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

type DialogType = 'uploadPhoto' | 'uploadVideo'

const StartAPostCard = (props: IProps) => {
    const styles = useStyles()
    const classes = globalStyles()
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const [openNewPostDialog, setOpenNewPostDialog] = useState(false);
    const [openNewEventDialog, setOpenNewEventDialog] = useState(false);


    return (
        <Box mb={2}>
            <Card>
                <CardContent>
                    <Typography
                        onClick={() => setOpenNewPostDialog(true)}
                        component={"div"}
                        style={{
                            textAlign: 'left',
                            padding: 25,
                            borderRadius: 5
                        }}
                        className={clsx(classes.fullWidth, classes.clickable)}>
                        {props.placeholder}
                    </Typography>

                    <XDialog
                        title={"New Post"}
                        open={openNewPostDialog}
                        onClose={() => setOpenNewPostDialog(false)}>
                        <NewPost />
                    </XDialog>

                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    onClick={() => setOpenPhotoDialog(true)}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <AddAPhotoIcon style={{marginRight: 10}}/> Photo
                                </Button>

                                <XDialog
                                    onClose={() => setOpenPhotoDialog(false)}
                                    title={"Upload photos"}
                                    open={openPhotoDialog}>
                                    <UploadFile acceptedTypes={['image/jpeg', 'image/png', 'image/bmp']}/>
                                </XDialog>
                            </Grid>

                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    onClick={() => setOpenVideoDialog(true)}
                                    size={"large"}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <VideocamIcon style={{marginRight: 10}}/> Video
                                </Button>

                                <XDialog
                                    onClose={() => setOpenVideoDialog(false)}
                                    title={"Upload videos"}
                                    open={openVideoDialog}>
                                    <UploadFile/>
                                </XDialog>
                            </Grid>

                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    onClick={() => setOpenNewEventDialog(true)}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <EventIcon style={{marginRight: 10}}/> Event
                                </Button>
                                <XDialog
                                    title={"Add an event"}
                                    maxWidth={"sm"}
                                    open={openNewEventDialog}
                                    onClose={() => setOpenNewEventDialog(false)}>
                                    <NewEvent />
                                </XDialog>
                            </Grid>

                            <Grid className={classes.textCenter} item xs={6} sm={3}>
                                <Button
                                    href={Urls.articles.create}
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