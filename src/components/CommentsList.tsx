import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Grid, Button} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import clsx from "clsx";
import {globalStyles} from "../theme/styles";
import {formatDistanceToNow} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {Urls} from "../routes/Urls";
import {PleaseWait} from "./PleaseWait";
import {getComments} from "../modules/posts/redux/postsEndpoints";
import {loadComments, loadPosts} from "../modules/posts/redux/postsActions";
import {commentsSelector} from "../modules/posts/redux/postsSelectors";
import { useHistory } from 'react-router-dom';
import {timeAgo} from "../utils/dateHelpers";
import {getAsync, makeUrl} from "../utils/ajax";
import {Endpoints} from "../services/Endpoints";

interface IProps {
    postId?: string
    articleId?: string
}

makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.default,
        },
        inline: {
            display: 'inline',
        },
    }),
);

export default function CommentsList({postId, articleId}: IProps) {
    const classes = globalStyles();
    const history = useHistory();
    const [comments, setComments] = useState([])

    const handleViewAuthor = (authorId: string) => {
        const url = Urls.profiles.onePerson(authorId)
        history.push(url)
    }

    useEffect(() => {
        const url = makeUrl("Profiles", Endpoints.blog.comment)
        getAsync(url, {articleId, postId})
            .then((response: any) => {
                const {comments} = response.body
                setComments(comments)
            })
    }, [articleId])

    const content = comments.map((c: any, index: number) => (
        <Grid
            key={index}
            style={
                {
                    borderRadius: 10,
                    marginBottom: 8,
                    paddingTop: 5,
                    paddingLeft: 4
                }
            } container spacing={1}>
            <Grid className={clsx(classes.textCenter)} item xs={2} sm={1}>
                <Avatar src={c.author?.avatar}>
                    {c.author?.firstname[0].toUpperCase()}{c.author?.lastname[0].toUpperCase()}
                </Avatar>
            </Grid>
            <Grid item xs={10} sm={11}>
                <Typography component={"div"}>
                    <a className={classes.clickable} onClick={() => handleViewAuthor(c.author?.id)}>
                        <strong>{c.author?.firstname} {c.author?.lastname}</strong>
                    </a>
                </Typography>
                <Typography style={{marginTop: '5px', whiteSpace: 'pre-line'}} paragraph>
                    {c.details}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography style={{cursor: 'pointer'}}>
                            Like
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography  component={"div"}>
                            <small style={{color: grey[500]}}>
                                {timeAgo(c.dateCreated)}
                            </small>
                        </Typography>
                    </Grid>
                </Grid>



            </Grid>
        </Grid>
    ))
    return (
        <Box mt={3}>
            {content}
        </Box>
    );
}
