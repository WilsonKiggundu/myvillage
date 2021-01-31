import {Avatar, Card, Typography} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import React, {useEffect, useState} from "react";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../../theme/styles";
import {IPost, IPostLike} from "../../interfaces/IPost";
import XDialog from "../../components/dialogs/XDialog";
import NewComment from "./forms/NewComment";
import {Urls} from "../../routes/Urls";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {IPerson} from "../profiles/people/IPerson";
import {getProfile} from "../../services/User";
import {useDispatch, useSelector} from "react-redux";
import Toast from "../../utils/Toast";
import {formatDistanceToNow} from "date-fns";
import {likePost, loadComments} from "./redux/postsActions";
import CommentsList from "../../components/CommentsList";
import {useHistory} from "react-router-dom";
import XVideo from "../../components/XVideo";
import {timeAgo} from "../../utils/dateHelpers";
import {userSelector} from "../../data/coreSelectors";
import XImageGridList from "../../components/XImageGridList";

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
        <Box mt={2}>
            {post ? (
                <Card>
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
                        // action={
                        //     <IconButton>
                        //         <MoreVert/>
                        //     </IconButton>
                        // }
                    />

                    <CardContent>
                        <Typography style={{whiteSpace: "pre-line"}} paragraph>{post.details}</Typography>

                        {
                            uploads ?
                                <Box mb={2} ml={1} mr={1}>

                                    <XImageGridList images={uploads} />

                                    {/*{uploads.map((p, index) => (*/}

                                    {/*    p.contentType.startsWith('video') ? (*/}
                                    {/*        <XVideo key={index} src={p.path}/>*/}
                                    {/*    ) : (*/}
                                    {/*        p.contentType.startsWith('image') ? (*/}
                                    {/*            <img key={index} src={p.path}/>*/}
                                    {/*        ) : ""*/}
                                    {/*    )*/}
                                    {/*))}*/}
                                </Box>
                                : ""
                        }

                        <Grid spacing={2} container justify={"flex-start"}>
                            {
                                post.likesCount ? (
                                    <Grid item>
                                        <Button
                                            onClick={() => setOpenLikesDialog(true)}
                                            className={classes.capitalize} variant={"text"}>
                                            {post.likesCount} {post.likesCount > 1 ? "Likes" : "Like"}
                                        </Button>
                                    </Grid>
                                ) : ""
                            }
                            {
                                post.commentsCount ? (
                                    <Grid item>
                                        <Button onClick={() => handleShowComments(1)} className={classes.capitalize}
                                                variant={"text"}>
                                            {post.commentsCount} {post.commentsCount > 1 ? "Comments" : "Comment"}
                                        </Button>
                                    </Grid>
                                ) : ""
                            }
                        </Grid>

                        <Divider style={{marginTop: 15}}/>

                        <Box mt={2}>
                            <Grid container spacing={2} justify={"center"}>
                                <Grid xs={6} item className={classes.textCenter}>
                                    <Button
                                        disabled={post.alreadyLikedByUser}
                                        style={{textTransform: 'inherit'}}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <ThumbUpAltIcon style={{marginRight: 10}}/> Like
                                    </Button>
                                </Grid>

                                <Grid xs={6} item className={classes.textCenter}>
                                    <Button
                                        variant={"text"}
                                        style={{textTransform: 'inherit'}}
                                        onClick={() => setOpenCommentDialog(true)}
                                    >
                                        <InsertCommentIcon style={{marginRight: 10}}/> Reply
                                    </Button>

                                    <XDialog
                                        title={"Add a comment"}
                                        open={openCommentDialog}
                                        onClose={() => setOpenCommentDialog(false)}>
                                        <NewComment onClose={() => setOpenCommentDialog(false)} post={post}/>
                                    </XDialog>

                                </Grid>

                            </Grid>
                        </Box>

                        {post.comments ? <CommentsList postId={post.id}/> : ""}
                    </CardContent>

                </Card>
            ) : "Post"}

        </Box>
    )
}

export default PostCard