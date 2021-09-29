import {IJob} from "../../interfaces/IJob";
import {Avatar, Box, Grid, List} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import '../jobs/Jobs.css'
import {longDate, timeAgo} from "../../utils/dateHelpers";
import {Urls} from "../../routes/Urls";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {ChevronRight, Work} from "@material-ui/icons";
import {getJobById} from "../jobs/redux/jobsEndpoints";
import {PleaseWait} from "../../components/PleaseWait";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import XDialog from "../../components/dialogs/XDialog";
import ListItem from "@material-ui/core/ListItem";
import LikeDialogBox from "../../components/LikeDialogBox";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import CommentsList from "../../components/CommentsList";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import NewComment from "./forms/NewComment";
import {IPost} from "../../interfaces/IPost";
import {likePost, loadComments} from "./redux/postsActions";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {grey} from "@material-ui/core/colors";

interface IProps {
    id?: string
    post: IPost
}

const JobPostCard = ({id, post}: IProps) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const [job, setJob] = useState<IJob | undefined>(undefined)
    const [jobDetails, setJobDetails] = useState<string>('')
    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [openLikesDialog, setOpenLikesDialog] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [commentsPage, setCommentsPage] = useState<number>(1)

    useEffect(() => {

        getJobById(id)
            .then((response: any) => {

                const job = response.body[0]

                setJob(job)

                let div = document.createElement("div")
                div.innerHTML = job?.details

                const eventDetails = div.textContent || div.innerText || ""
                setJobDetails(eventDetails)

            })

    }, [id])

    const handleViewDetails = () => {
        if (id) history.push(Urls.jobs.singleJob(id))
    }

    const handleLike = async (postId: string) => {
        if (!user) {
            setOpenSnackbar(true)
        } else {
            const personId = user?.profile.sub
            dispatch(likePost({entityId: postId, personId}))
        }
    }

    const handleShowComments = async (page: number) => {
        setShowComments(true)
        setCommentsPage(page)
        await dispatch(loadComments({postId: post.id, page}))
    }

    const handleAddComment = () => {
        if (user) setOpenCommentDialog(true)
        else setOpenSnackbar(true)
    }

    if (job === undefined) return <PleaseWait/>

    return (
        <div className="event-body">
            <Grid item className="event-description">
                <Grid container spacing={2}>
                    <Grid item>
                        <Work color={"primary"} style={{fontSize: 45}}/>
                    </Grid>
                    <Grid item>
                        <div className="event-title job-title">
                            <a href={Urls.singleEvent(job?.id)}>
                                {job?.title.toLowerCase()}
                            </a>
                        </div>
                        <span style={{color: grey[400]}}>Posted {timeAgo(post.dateCreated)}</span>
                    </Grid>
                </Grid>
                <Grid container justify={"flex-start"} spacing={2}>
                    <Grid item xs={12}>
                        <Box mt={3} mb={2}>
                            <div className="job-details-teaser">
                                {jobDetails}
                            </div>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <strong>Company</strong><br/>
                        <span>{job?.company ? job?.company.name : job?.companyId}</span>
                    </Grid>
                    {
                        job?.location && <Grid xs={12} md={6} item className="job-location">
                            <strong>Location</strong><br/>
                            <span>{job?.location}</span>
                        </Grid>
                    }
                    {
                        job?.deadline && <Grid item xs={12} md={6}>
                            <strong>Application deadline</strong><br/>{longDate(job.deadline)}
                        </Grid>
                    }
                    {
                        job?.category && <Grid item xs={12} md={6}>
                            <strong>Category</strong><br/>{job?.category?.name}
                        </Grid>
                    }
                </Grid>
                <Box mt={3}>
                    <Button variant={"outlined"} onClick={handleViewDetails}>
                        View job details <ChevronRight/>
                    </Button>
                </Box>
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

export default JobPostCard
