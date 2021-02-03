import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {IconButton} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        subtitle: {
            display: 'block',
            whiteSpace: 'nowrap',
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            width: "95%",
            '&$:after': {
                content: '...'
            },
            '&$:hover': {
                overflow: 'visible'
            }
        }
    }),
);

export interface IListItem {
    title: string
    subtitle?: string
    tagline?: string
    icon?: any
    divider?: boolean
    avatar?: string
    onClick?: () => void
}

interface IProps {
    items: IListItem[]
}

export default function XList({items}: IProps) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {items.length ? (
                items.map((item: IListItem, index: number) => (
                    <div key={index}>
                        <ListItem button onClick={item.onClick} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    variant={"circular"}
                                    alt={item.title}
                                    src={item.avatar}>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={clsx(classes.inline, classes.subtitle)}
                                        color="textPrimary"
                                    >
                                        {item.subtitle}
                                    </Typography>
                                }
                            />

                            {item.icon ?
                                <ListItemSecondaryAction>
                                    <IconButton onClick={item.onClick} edge="end" aria-label="comments">
                                        {item.icon}
                                    </IconButton>
                                </ListItemSecondaryAction> : ""
                            }
                        </ListItem>
                        {item.divider && index < items.length - 1 ? <Divider variant="fullWidth" component="li"/> : ""}

                    </div>
                ))
            ) : ""}

        </List>
    );
}
