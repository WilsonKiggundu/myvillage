import {Avatar, Typography, Link, List} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import React, {useState} from "react";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../theme/styles";
import {IPost} from "../../interfaces/IPost";
import XDialog from "../../components/dialogs/XDialog";
import NewComment from "./forms/NewComment";
import {Urls} from "../../routes/Urls";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {useDispatch, useSelector} from "react-redux";
import {likePost, loadComments} from "./redux/postsActions";
import CommentsList from "../../components/CommentsList";
import {useHistory} from "react-router-dom";
import {timeAgo} from "../../utils/dateHelpers";
import {userSelector} from "../../data/coreSelectors";
import XImageGridList from "../../components/XImageGridList";
import LikeDialogBox from "../../components/LikeDialogBox";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import './css/PostCard.css'
import {IEmailObject} from "../../interfaces/IEmailObject";
import {sendEmail} from "../../services/NotificationService";


interface IProps {
    post: IPost
}

const PostCard = ({post}: IProps) => {

    const user = useSelector(userSelector)
    const alreadyLiked = post.alreadyLikedByUser
    const [showComments, setShowComments] = useState<boolean>(false)
    const [commentsPage, setCommentsPage] = useState<number>(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = globalStyles()
    const uploads = post?.uploads

    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openLikesDialog, setOpenLikesDialog] = useState<boolean>(false)

    const handleLike = async (postId: string) => {
        dispatch(likePost({entityId: postId, personId: user?.profile.sub}))

        // const emailToSend: IEmailObject = {
        //     body: `<p>${user.profile.family_name} liked your post</p>`,
        //     recipient: "wkiggundu@innovationvillage.co.ug",
        //     senderEmail: "no-reply@myvillage.africa",
        //     senderName: "Wilson Kiggundu",
        //     subject: "MyVillage news feed"
        // }
        //
        // await sendEmail(emailToSend)

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
  
    return (
        <Box className="PostCard" mt={2}>
            {post ? (
                <div>
                    <CardHeader
                        avatar={<Avatar src={post.author?.avatar}>
                            {post.author?.firstname[0].toUpperCase()}{post.author?.lastname[0].toUpperCase()}
                        </Avatar>}
                        title={
                            <Typography component={"div"}>
                                <strong>
                                    <Link className={classes.clickable}
                                       onClick={() => handleViewAuthor(post.authorId)}>
                                        {post.author?.firstname} {post.author?.lastname}
                                    </Link>
                                </strong>
                            </Typography>
                        }
                        subheader={<small style={{color: grey[500]}}>
                            {timeAgo(post.dateCreated)}
                        </small>}
                    />

                    <div className="PostCard-content">
                        <div className="Post-details">{post.details}</div>
                        {
                            uploads?.length ?
                                <Box mb={2} ml={2} mr={2}>
                                    <XImageGridList images={uploads}/>
                                </Box>
                                : ""
                        }
                    </div>

                    <div className="PostCard-actions">
                        <Grid container  justify={"space-between"}>
                            <Grid item >
                                <Button
                                    disabled={post.alreadyLikedByUser}
                                    onClick={() => handleLike(post.id)}
                                >
                                    <ThumbUpAltIcon />
                                </Button>
                                {post.likesCount ? (
                                    <Button
                                    className="ShowLikeButton"
                                    onClick={() => setOpenLikesDialog(true)}
                                    >
                                        <span className="Post-action">{post.likesCount > 1 ? "Likes" : "Like"}</span>
                                        <span className="Counts">{post.likesCount}</span>
                                    </Button>
                                    
                                ):""}
                                <XDialog
                                    title={
                                    <Grid item>
                                        <ListItem className="Like-items">
                                            <ThumbUpAltIcon />
                                            <span className="Post-action">{post.likesCount > 1 ? "Likes" : "Like"}</span>
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
                                        <span className="Post-action">{post.commentsCount > 1 ? "Comments" : "Comment"}</span>
                                        <span className="Counts">{post.commentsCount}</span> 
                                    </Button>
                                </Grid>
                            ):""}

                        </Grid>
                    </div>
                    <div className="Comments">
                        {post.comments ? <CommentsList postId={post.id}/> : ""}

                        <div
                            onClick={() => setOpenCommentDialog(true)}
                            className="Comment-input">
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText primary="Write a comment..." />
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
            ) : ""}

        </Box>
    )
}

export default PostCard