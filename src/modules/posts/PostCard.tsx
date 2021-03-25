import {Avatar, Link, List, Typography} from "@material-ui/core";
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
import {EmailSettings} from "../../data/constants";
import {getPersonContact} from "../profiles/people/redux/peopleEndpoints";
import {IContact} from "../../interfaces/IContact";


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
        const personId = user?.profile.sub
        dispatch(likePost({entityId: postId, personId}))

        const personContacts: any = await getPersonContact(personId)
        let emails: IContact[] = personContacts.body.filter((contact: IContact) => contact.type === 2)
        const recipient = emails.map((contact: IContact) => contact.value).join(',')

        const body = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                </head>
                <body style="text-align: center; font-family: 'Montserrat', sans-serif; margin: 0; padding: 0; background-color: #f1f1f1">
                    <div style="padding: 25px; width: 100%; background-color: #1c1c1c; color: #ffffff;">
                        <h1>${post.author?.firstname},<br/>someone liked your post</h1>
                    </div>
                    <div style="background-color: #ffffff; padding: 15px; margin: 0 auto; max-width: 80%">
                        <p>
                            <a style="background-color: #e98a2b; text-decoration: none; color: white; padding: 15px;" 
                                href="${Urls.base}${Urls.profiles.onePerson(personId)}">
                                View profile
                            </a>
                        </p>
                    </div>
                    <div style="padding: 25px; font-size: 10px; color: #cccccc">
                        <p>This is an auto-generated email sent from an unmonitored emailing list. You may not reply to it directly.</p>
                    </div>
                </body>
            </html>`

        const emailToSend: IEmailObject = {
            body: body,
            recipient: recipient,
            senderEmail: EmailSettings.senderEmail,
            senderName: EmailSettings.senderName,
            subject: "MyVillage news feed"
        }

        await sendEmail(emailToSend)

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
                        <Grid container justify={"space-between"}>
                            <Grid item>
                                <Button
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
                            onClick={() => setOpenCommentDialog(true)}
                            className="Comment-input">
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar/>
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
            ) : ""}

        </Box>
    )
}

export default PostCard