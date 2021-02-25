import {Avatar, Typography} from "@material-ui/core";
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

import './css/PostCard.css'

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
                                    <a className={classes.clickable}
                                       onClick={() => handleViewAuthor(post.authorId)}>
                                        {post.author?.firstname} {post.author?.lastname}
                                    </a>
                                </strong>
                            </Typography>
                        }
                        subheader={<small style={{color: grey[500]}}>
                            {timeAgo(post.dateCreated)}
                        </small>}
                    />

                    <div className="PostCard-content">
                        <div style={{whiteSpace: "pre-line", marginBottom: 15}}>{post.details}</div>
                        {
                            uploads?.length ?
                                <Box mb={2} ml={1} mr={1}>
                                    <XImageGridList images={uploads}/>
                                </Box>
                                : ""
                        }
                    </div>

                    {/*<div className="PostCard-actions">*/}
                    {/*    <Grid spacing={2} container justify={"flex-start"}>*/}
                    {/*        {*/}
                    {/*            post.likesCount ? (*/}
                    {/*                <Grid item>*/}
                    {/*                    <Button*/}
                    {/*                        onClick={() => setOpenLikesDialog(true)}*/}
                    {/*                        className={classes.capitalize} variant={"text"}>*/}
                    {/*                        {post.likesCount} {post.likesCount > 1 ? "Likes" : "Like"}*/}
                    {/*                    </Button>*/}
                    {/*                </Grid>*/}
                    {/*            ) : ""*/}
                    {/*        }*/}
                    {/*        {*/}
                    {/*            post.commentsCount ? (*/}
                    {/*                <Grid item>*/}
                    {/*                    <Button onClick={() => handleShowComments(1)} className={classes.capitalize}*/}
                    {/*                            variant={"text"}>*/}
                    {/*                        {post.commentsCount} {post.commentsCount > 1 ? "Comments" : "Comment"}*/}
                    {/*                    </Button>*/}
                    {/*                </Grid>*/}
                    {/*            ) : ""*/}
                    {/*        }*/}
                    {/*    </Grid>*/}
                    {/*</div>*/}

                    <div className="PostCard-actions">
                        <Grid container spacing={2} justify={"center"}>
                            <Grid item>
                                <Button
                                    className="PostCard-button"
                                    disabled={post.alreadyLikedByUser}
                                    style={{textTransform: 'inherit'}}
                                    onClick={() => handleLike(post.id)}
                                >
                                    <ThumbUpAltIcon style={{marginRight: 5}}/> Like
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    className="PostCard-button"
                                    variant={"text"}
                                    style={{textTransform: 'inherit'}}
                                    onClick={() => setOpenCommentDialog(true)}
                                >
                                    <InsertCommentIcon style={{marginRight: 10}}/> Comment
                                </Button>

                                <XDialog
                                    title={"Add a comment"}
                                    open={openCommentDialog}
                                    onClose={() => setOpenCommentDialog(false)}>
                                    <NewComment onClose={() => setOpenCommentDialog(false)} post={post}/>
                                </XDialog>

                            </Grid>

                        </Grid>
                    </div>

                    {post.comments ? <CommentsList postId={post.id}/> : ""}
                </div>
            ) : ""}

        </Box>
    )
}

export default PostCard