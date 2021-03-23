import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import {blue, grey} from '@material-ui/core/colors';
import {IPostLike} from "../interfaces/IPost";
import {getAsync, makeUrl} from "../utils/ajax";
import {Endpoints} from "../services/Endpoints";
import {PleaseWait} from "./PleaseWait";
import {Box, Typography} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import {Urls} from "../routes/Urls";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },

    secondaryText: {
        color: grey[400],
        fontSize: '0.9em',
        height: '1.2em',
        whiteSpace: 'nowrap',
        width: '90%',
        position: 'relative',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

interface IProps {
    onClose?: () => any
    postId: string
}

export default function LikeDialogBox({postId, onClose}: IProps) {
    const classes = useStyles();
    const history = useHistory()

    const [likes, setLikes] = useState<IPostLike[]>([])

    useEffect(() => {
        (async () => {
            const url = makeUrl("Profiles", Endpoints.blog.likes)
            const response: any = await getAsync(url, {postId})
            setLikes(response.body.likes)
        })()
    }, [postId])

    const handleViewProfile = (personId: string) => {
        const url = Urls.profiles.onePerson(personId)
        history.push(url)
    }

    if (!likes.length)
        return <Box mb={2}>
            <PleaseWait/>
        </Box>

    return (
        <List>
            {likes.map((like: IPostLike, index: number) => (
                <ListItem onClick={() => handleViewProfile(like.personId)} button key={index}>
                    <ListItemAvatar>
                        <Avatar
                            src={like.person?.avatar}
                            className={classes.avatar}>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        secondary={
                            <div className={classes.secondaryText}>
                                {like.person?.bio}
                            </div>
                        }
                        primary={`${like.person?.firstname} ${like.person?.lastname}`}/>
                </ListItem>
            ))}
        </List>
    );
}
