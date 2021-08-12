import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import BookIcon from "@material-ui/icons/Book";
import EventIcon from "@material-ui/icons/Event";
import React, {useState} from "react";
import {globalStyles} from "../../../theme/styles";
import XDialog from "../../../components/dialogs/XDialog";
import UploadFile from "./UploadFile";
import NewPost from "./NewPost";
import WorkIcon from '@material-ui/icons/Work';

import '../css/StartAPostCard.css'
import {Avatar, List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Urls} from "../../../routes/Urls";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import {useSelector} from "react-redux";
import {userSelector} from "../../../data/coreSelectors";
import {XLoginSnackbar} from "../../../components/XLoginSnackbar";

interface IProps {
    placeholder: string
}

const StartAPostCard = (props: IProps) => {
    const classes = globalStyles()
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const [openNewPostDialog, setOpenNewPostDialog] = useState(false);
    const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
    const [openNewJobDialog, setOpenNewJobDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const user = useSelector(userSelector)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"))

    const handleNewPost = () => {
        if (user) setOpenNewPostDialog(true)
        else setOpenSnackbar(true)
    }

    const handlePhotoUpload = () => {
        if (user) setOpenPhotoDialog(true)
        else setOpenSnackbar(true)
    }

    const handleVideoUpload = () => {
        if (user) setOpenVideoDialog(true)
        else setOpenSnackbar(true)
    }

    const handleCreateEvent = () => {
        if (user) window.location.replace(Urls.createEvent)
        else setOpenSnackbar(true)
    }

    const handleCreateJob = () => {
        if (user) window.location.replace(Urls.jobs.create)
        else setOpenSnackbar(true)
    }

    return (
            <div className="start-a-post">
                <div>

                    {!user && <XLoginSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} />}

                    <div
                        onClick={handleNewPost}
                        className="input-box">
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary="What is on your mind?" />
                            </ListItem>
                        </List>
                    </div>

                    <XDialog
                        title={"Create a Post"}
                        open={openNewPostDialog}
                        onClose={() => setOpenNewPostDialog(false)}>
                        <NewPost onClose={() => setOpenNewPostDialog(false)}/>
                    </XDialog>

                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid className="button-container" item xs={3}>
                                <Button
                                    className={clsx(classes.bold, classes.fullWidth)}
                                    onClick={handlePhotoUpload}>
                                    <CameraAltIcon className="icon"/>
                                    {!isMobile && <span>
                                        Photo
                                    </span>}
                                </Button>

                                <XDialog
                                    onClose={() => setOpenPhotoDialog(false)}
                                    title={"Upload photos"}
                                    open={openPhotoDialog}>
                                    <UploadFile
                                        addCaption={true}
                                        addToFeed={true}
                                        showUploadButton={true}
                                        filesLimit={10}
                                        onClose={() => setOpenPhotoDialog(false)}
                                        acceptedTypes={['image/jpeg', 'image/png', 'image/bmp']}/>
                                </XDialog>
                            </Grid>

                            <Grid className="button-container" item xs={3}>
                                <Button
                                    href={Urls.articles.create}
                                    size={"large"}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <BookIcon className="icon"/>
                                    {!isMobile && <span>
                                       Article
                                    </span>}
                                </Button>

                                <XDialog
                                    onClose={() => setOpenVideoDialog(false)}
                                    title={"Upload videos"}
                                    open={openVideoDialog}>
                                    <UploadFile
                                        addToFeed={true}
                                        filesLimit={4}
                                        acceptedTypes={['video/*']}
                                        onClose={() => setOpenVideoDialog(false)}/>
                                </XDialog>
                            </Grid>

                            <Grid className="button-container" item xs={3}>
                                <Button
                                    onClick={handleCreateEvent}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <EventIcon  className="icon"/>

                                    {!isMobile && <span>
                                        Event
                                    </span>}

                                </Button>
                            </Grid>

                            <Grid className="button-container" item xs={3}>
                                <Button
                                    onClick={handleCreateJob}
                                    style={{padding: 5}}
                                    className={clsx(classes.bold, classes.fullWidth)}>
                                    <WorkIcon className="icon"/>
                                    {!isMobile && <span>
                                        Job
                                    </span>}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                </div>
            </div>
    )
}

export default StartAPostCard