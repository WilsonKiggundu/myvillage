import {Avatar, Card, Typography} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import {globalStyles} from "../theme/styles";
import CommentsList from "./CommentsList";
import {IPost} from "../interfaces/IPost";
import {formatDistanceToNow} from "date-fns";
import XDialog from "./dialogs/XDialog";
import NewComment from "../modules/posts/forms/NewComment";
import VideoPoster from "../assets/images/My-Village-Full-logo-02.svg";
import {useDispatch, useSelector} from "react-redux";
import { getPosts } from "../modules/posts/postsSlice";

interface IProps {
    post: IPost
}

const PostCard = ({post}: IProps) => {

    const classes = globalStyles()
    const uploads = post?.uploads

    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false)

    // const dispatch = useDispatch()
    // const error = useSelector((state: any) => state.posts.error)
    //
    // const status = useSelector((state: any) => state.posts.status)
    //
    // useEffect(() => {
    //     // if (status === 'idle'){
    //     //     dispatch(getPosts())
    //     // }
    // }, [status, dispatch])

    return (
        <Box mb={2}>
            {post ? (
                <Card>
                    <CardHeader
                        avatar={<Avatar/>}
                        title={<strong>{post.author?.firstname} {post.author?.lastname}</strong>}
                        subheader={<small style={{color: grey[500]}}>
                            {formatDistanceToNow(new Date(post.dateCreated), {
                                includeSeconds: true,
                                addSuffix: true
                            })}
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
                                <Grid style={{marginBottom: 15}} container spacing={1}>

                                    {uploads.map((p, index) => (

                                        p.contentType.startsWith('video') ? (
                                            <Grid key={index} item>
                                                <video controls
                                                       poster={VideoPoster}
                                                       style={{width: "100%", height: "auto"}}
                                                       autoPlay={false}
                                                       color={"white"}
                                                       preload={'auto'}>
                                                    <source src={p.path} type={p.contentType}/>
                                                    Your browser does not support videos
                                                </video>
                                            </Grid>
                                        ) : (
                                            p.contentType.startsWith('image') ? (
                                                <Grid key={index} item xs={6} sm={4}>
                                                    <Box style={{
                                                        backgroundImage: `url(${p.path})`,
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        width: '100%', height: 300
                                                    }}>

                                                    </Box>
                                                </Grid>
                                            ) : ""
                                        )
                                    ))}
                                </Grid>
                                : ""
                        }

                        <Divider/>

                        <Box mt={2}>
                            <Grid container>
                                <Grid item xs={6} className={classes.textCenter}>
                                    <Button className={clsx(classes.fullWidth, classes.bold)}>
                                        <ThumbUpAltIcon style={{marginRight: 10}}/> Like
                                    </Button>
                                </Grid>

                                <Grid item xs={6} className={classes.textCenter}>
                                    <Button onClick={() => setOpenCommentDialog(true)}
                                            className={clsx(classes.fullWidth, classes.bold)}>
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

                        <CommentsList postId={post.id}/>
                    </CardContent>

                </Card>
            ) : ""}
        </Box>
    )
}

export default PostCard