import {Avatar, IconButton, Link, List, Typography} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import React, {MouseEvent, useState} from "react";
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
import XImageGridList from "../../components/grid-list/XImageGridList";
import LikeDialogBox from "../../components/LikeDialogBox";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import './css/PostCard.css'
import {XLoginSnackbar} from "../../components/XLoginSnackbar";
import {MoreVert} from "@material-ui/icons";
import XStyledMenu from "../../components/XStyledMenu";
import {deleteAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";
import Linkify from "react-linkify"
import {DELETE_POST, FETCH_COMMENTS} from "./redux/postsReducer";

interface IProps {
    post: IPost
}

const PostCard = ({post}: IProps) => {

    const user = useSelector(userSelector)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [commentsPage, setCommentsPage] = useState<number>(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = globalStyles()
    const uploads = post?.uploads

    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false)
    const [openLikesDialog, setOpenLikesDialog] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const [actionMenuEl, setActionMenuEl] = React.useState<null | HTMLElement>(null);
    const showActionMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setActionMenuEl(event.currentTarget)
    }

    const handleLike = async (postId: string) => {
        if (!user) {
            setOpenSnackbar(true)
        } else {
            const personId = user?.profile.sub
            dispatch(likePost({entityId: postId, personId}))
        }
    }

    const handleAddComment = () => {
        if (user) setOpenCommentDialog(true)
        else setOpenSnackbar(true)
    }

    const handleViewAuthor = (authorId: string) => {
        const url = Urls.profiles.onePerson(authorId)
        history.push(url)
    }

    const handleHidePost = (postId: string) => {
        setActionMenuEl(null)
        const url = makeUrl("Profiles", Endpoints.blog.blacklist)
        postAsync(url, {personId: user?.profile.sub, blacklistId: postId})
            .then(() => Toast.success("Success"))
            .catch(error => Toast.error(error))
    }

    const handleBlockAuthor = (authorId: string) => {
        setActionMenuEl(null)
        const url = makeUrl("Profiles", Endpoints.person.blacklist)
        const personId = user?.profile.sub

        if (personId !== authorId) {
            postAsync(url, {personId, blacklistId: authorId})
                .then(() => Toast.success("Success"))
                .catch(error => Toast.error(error))
        }
    }

    const handleDeletePost = (id: string) => {
        setActionMenuEl(null)
        const url = makeUrl("Profiles", Endpoints.blog.post)
        const personId = user?.profile.sub

        deleteAsync(url, {id})
            .then(() => {
                dispatch({ type: DELETE_POST, payload: {id} })
            })
            .catch(error => Toast.error(error))
    }

    const handleShowComments = async (page: number) => {
        setShowComments(true)
        setCommentsPage(page)
        await dispatch(loadComments({postId: post.id, page}))
    }

    const menuDeleteItem = {
        primaryText: "Delete",
        onClick: () => handleDeletePost(post.id)
    }

    const menuItems = [
        {
            onClick: () => handleHidePost(post.id),
            primaryText: "Hide Post",
        },
        {
            disabled: user?.profile.sub === post.authorId,
            primaryText: "Block Author",
            onClick: () => handleBlockAuthor(post.authorId)
        }
    ]

    if (post.authorId === user?.profile.sub){
        menuItems.push(menuDeleteItem)
    }


    return (
        <Box className="PostCard" mt={2}>
            {post ? (
                <div>

                    {!user && <XLoginSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)}/>}

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
                        action={

                            <>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={showActionMenu}
                                >
                                    <MoreVert/>
                                </IconButton>
                                <XStyledMenu
                                    anchor={actionMenuEl}
                                    items={menuItems}
                                    onClose={() => setActionMenuEl(null)}/>
                            </>
                        }
                    />

                    <div className="PostCard-content">
                        {post.details &&
                        <Linkify>
                            <div dangerouslySetInnerHTML={{
                                __html: post.details
                            }} className="Post-details" />
                        </Linkify>
                        }
                        {
                            uploads?.length ?
                                <XImageGridList images={uploads}/>
                                : ""
                        }
                    </div>

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
            ) : ""}

        </Box>
    )
}

export default PostCard