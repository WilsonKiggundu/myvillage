import {IEvent} from "../../interfaces/IEvent";
import {Avatar, Box, Button, CircularProgress, Grid, List} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import '../events/event-card.css'
import {useHistory} from "react-router-dom";
import {Urls} from "../../routes/Urls";
import {ChevronRight, LocationOn} from "@material-ui/icons";
import EventIcon from "@material-ui/icons/Event";
import {longDate, timeAgo, timeFormat} from "../../utils/dateHelpers";
import {getEventById} from "../events/redux/eventsEndpoints";
import {PleaseWait} from "../../components/PleaseWait";
import {grey} from "@material-ui/core/colors";
import {handleLogin} from "../../utils/authHelpers";
import {Endpoints} from "../../services/Endpoints";
import {makeUrl, postAsync} from "../../utils/ajax";
import Toast from "../../utils/Toast";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {isBefore} from "date-fns";
import ReactLinkify from "react-linkify";
import CommentsList from "../../components/CommentsList";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import XDialog from "../../components/dialogs/XDialog";
import NewComment from "./forms/NewComment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import LikeDialogBox from "../../components/LikeDialogBox";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import {likePost, loadComments} from "./redux/postsActions";

const EventPostCard = ({id, post}: any) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const [event, setEvent] = useState<IEvent | undefined>(undefined)
    const [eventDetails, setEventDetails] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [isAttending, setIsAttending] = useState<boolean>(false)
    const [isPastEvent, setIsPastEvent] = useState<boolean>(false)
    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [openLikesDialog, setOpenLikesDialog] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [commentsPage, setCommentsPage] = useState<number>(1)

    useEffect(() => {

        getEventById(id)
            .then((response: any) => {

                const event = response.body

                setEvent(event)
                setIsPastEvent(isBefore(new Date(event.endDateTime), new Date()))

                if (user) {
                    const userId = user.profile.sub
                    setIsAttending(event.attendances?.filter((f: any) => f.profileId === userId).length > 0)
                }

                let div = document.createElement("div")
                div.innerHTML = event?.details

                const eventDetails = div.textContent || div.innerText || ""
                setEventDetails(eventDetails)

            })

    }, [id])

    const handleViewEvent = (eventId: any) => {
        history.push(Urls.singleEvent(eventId))
    }

    const handleLike = async (postId: string) => {
        if (!user) {
            setOpenSnackbar(true)
        } else {
            const personId = user?.profile.sub
            dispatch(likePost({entityId: postId, personId}))
        }
    }

    const handleViewAuthor = (authorId: string) => {
        const url = Urls.profiles.onePerson(authorId)
        history.push(url)
    }

    const handleShowComments = async (page: number) => {
        setShowComments(true)
        setCommentsPage(page)
        await dispatch(loadComments({postId: post.id, page}))
    }

    const handleRegister = async (eventId: any) => {

        setSubmitting(true)


        const profileId = user.profile.sub

        try {
            const endpoint = `${Endpoints.events.api}/${eventId}/register/${profileId}`
            const url = makeUrl("Profiles", endpoint)

            await postAsync(url, {})

            setSubmitting(false)
            setIsAttending(true)
            Toast.success("Your registration has been successful")

        } catch (error) {
            Toast.error(error.toString())
        } finally {

        }
    }

    const handleAddComment = () => {
        if (user) setOpenCommentDialog(true)
        else setOpenSnackbar(true)
    }

    if (event === undefined) return <PleaseWait/>

    return (
        <div className="event-body">
            <Grid item lg={event.uploads?.length ? 8 : 12} className='event-description'>
                <Grid container spacing={2}>
                    <Grid item>
                        <EventIcon color={"secondary"} style={{fontSize: 45}} />
                    </Grid>
                    <Grid item>
                        <div className="event-title">
                            <a href={Urls.singleEvent(event.id)}>
                                {event.title}
                            </a>
                        </div>
                        <span style={{color: grey[400]}}>Posted {timeAgo(post.dateCreated)}</span>
                    </Grid>
                </Grid>

                {
                    eventDetails && <Box mt={3} mb={2}>
                        <div className="event-details-teaser">
                            <ReactLinkify>
                                {eventDetails}
                            </ReactLinkify>
                        </div>
                    </Box>
                }
                <Grid
                    container
                    className='event-rsvp'
                    justify={"space-between"}
                >
                    <Grid item xs={12}>
                        <Grid container>

                            <Box style={{width: '100%'}} mb={4} mt={0}>
                                <Grid spacing={2} container justify={"flex-start"}>
                                    <Grid item xs={12} md={12}>
                                        <div className="event-icon">
                                            <LocationOn color={"secondary"} style={{fontSize: 30}}/>
                                        </div>
                                        <strong>Location</strong><br/>
                                        <div>{event.location}</div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div className="event-icon">
                                            <EventIcon style={{fontSize: 30}}/>
                                        </div>
                                        <strong>Starts on</strong><br/>
                                        {longDate(event.startDateTime)}<br/>
                                        <span className="event-time">{timeFormat(event.startDateTime)}</span>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div className="event-icon">
                                            <EventIcon style={{fontSize: 30}}/>
                                        </div>
                                        <strong>Ends on</strong><br/>
                                        {longDate(event.endDateTime)}<br/>
                                        <span className="event-time">{timeFormat(event.endDateTime)}</span>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {!isPastEvent && <Grid item>
                                <Button onClick={() => handleRegister(event.id)}
                                        disableElevation variant={"contained"}
                                        style={{textTransform: 'inherit'}}
                                        disabled={submitting || isAttending}
                                        color={"secondary"}>
                                    {
                                        submitting ? <CircularProgress size={20}/> :
                                            isAttending ? "You are attending" : "Register to attend"
                                    }

                                </Button>
                            </Grid>}
                            <Grid item>
                                <Button
                                    onClick={() => handleViewEvent(event.id)}
                                    style={{textTransform: 'inherit'}}
                                    variant={"outlined"}
                                    size={"medium"}
                                    color={"default"}
                                    disableElevation>
                                    Event Details <ChevronRight/>
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

            <div className="PostCard-actions">
                <Grid container justify={"space-between"}>
                    <Grid item>
                        <Button
                            variant={"outlined"}
                            disabled={post.alreadyLikedByUser}
                            onClick={() => handleLike(post.id)}
                        >
                            <ThumbUpAltIcon/>
                        </Button>
                        {post.likesCount ? (
                            <Button
                                className="ShowLikeButton"
                                onClick={() => setOpenLikesDialog(true)}
                            >
                                <span className="Post-action">{post.likesCount > 1 ? "Likes" : "Like"}</span>
                                <span className="Counts">{post.likesCount}</span>
                            </Button>

                        ) : ""}
                        <XDialog
                            title={
                                <Grid item>
                                    <ListItem className="Like-items">
                                        <ThumbUpAltIcon/>
                                        <span
                                            className="Post-action">{post.likesCount > 1 ? "Likes" : "Like"}</span>
                                        <span className="Counts">{post.likesCount}</span>
                                    </ListItem>
                                </Grid>
                            }

                            open={openLikesDialog}
                            onClose={() => setOpenLikesDialog(false)}>
                            <LikeDialogBox postId={post.id} onClose={() => setOpenLikesDialog(false)}/>
                        </XDialog>
                    </Grid>
                    {post.commentsCount ? (
                        <Grid item>
                            <Button
                                variant={"text"}
                                onClick={() => handleShowComments(1)}
                            >
                                <InsertCommentIcon/>
                                <span
                                    className="Post-action">{post.commentsCount > 1 ? "Comments" : "Comment"}</span>
                                <span className="Counts">{post.commentsCount}</span>
                            </Button>
                        </Grid>
                    ) : ""}

                </Grid>
            </div>

            <div className="Comments">
                {post.comments ? <CommentsList postId={post.id}/> : ""}

                <div
                    onClick={handleAddComment}
                    className="Comment-input">
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={user?.profile.picture}/>
                            </ListItemAvatar>
                            <ListItemText primary="Write a comment..."/>
                        </ListItem>
                    </List>
                </div>
                <XDialog
                    title={"Add a comment"}
                    open={openCommentDialog}
                    onClose={() => setOpenCommentDialog(false)}>
                    <NewComment onClose={() => setOpenCommentDialog(false)} post={post}/>
                </XDialog>
            </div>

        </div>
    )
}

export default EventPostCard