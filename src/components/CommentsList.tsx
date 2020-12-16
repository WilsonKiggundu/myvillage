import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import clsx from "clsx";
import {globalStyles} from "../theme/styles";
import {IComment} from "../interfaces/IComment";
import {get, makeUrl} from "../utils/ajax";
import {Endpoints} from "../services/Endpoints";
import {formatDistanceToNow} from "date-fns";
import Divider from "@material-ui/core/Divider";
import store from "../data/store";
import {useDispatch, useSelector} from "react-redux";
import {getComments, getCommentsByPostId} from "../modules/posts/commentsSlice";
import {PleaseWait} from "./PleaseWait";
import PostCard from "./PostCard";
import EventCard from "../modules/events/EventCard";
import {Alert} from "@material-ui/lab";

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

    const comments: any = useSelector(state => getCommentsByPostId(state, postId))
    const orderedByDate = comments?.slice().sort((a: any, b: any) => a.dateCreated.localeCompare(b.dateCreated))

    const content = orderedByDate ? orderedByDate.map((c: any, index: number) => (
        <Grid
            key={index}
            style={
                {
                    backgroundColor: grey[100],
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
                    <strong>{c.author?.firstname} {c.author?.lastname}</strong>
                </Typography>
                <Typography style={{marginTop: '-5px'}} component={"div"}>
                    <small style={{color: grey[500]}}>
                        {formatDistanceToNow(new Date(c.dateCreated), {
                            includeSeconds: true,
                            addSuffix: true
                        })}
                    </small>
                </Typography>
                <Typography style={{marginTop: '5px', whiteSpace: 'pre-line'}} paragraph>
                    {c.details}
                </Typography>
            </Grid>
        </Grid>
    )) : ""

    return (
        <Box mt={3}>
            {content}
        </Box>
    );
}
