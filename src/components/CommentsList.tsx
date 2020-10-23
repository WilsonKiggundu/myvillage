import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Comments} from "../data/mockData";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import clsx from "clsx";
import {globalStyles} from "../theme/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
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

export default function CommentsList() {
    const classes = globalStyles();
    const comments = Comments

    return (
        <Box>
            <Grid style={{marginBottom: 10}} container>
                <Grid item xs={6}>
                    <Typography component={"div"} variant={"h6"}>Comments</Typography>
                </Grid>
            </Grid>
            {
                comments ?
                    comments.map(c => (
                        <Grid
                            style={
                            {
                                backgroundColor: grey[100],
                                borderRadius: 10,
                                marginBottom: 8,
                                paddingTop: 5
                            }
                        } container spacing={1}>
                            <Grid className={clsx(classes.textCenter)} item xs={2} sm={1}>
                                <Avatar className={clsx(classes.center)} src={c.avatar}/>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Typography component={"div"}>
                                    <strong>{c.author}</strong>
                                </Typography>
                                <Typography style={{marginTop: '-5px'}} component={"div"}>
                                    <small style={{color: grey[500]}}>{c.date}</small>
                                </Typography>
                                <Typography style={{marginTop: '5px'}} paragraph>
                                    {c.details}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))
                    : ""
            }
        </Box>
    );
}
