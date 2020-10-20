import {Card, createStyles, Theme} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import CardActionArea from "@material-ui/core/CardActionArea";
import clsx from "clsx";

interface IProps {
    name: string
    avatar?: string
    id?: string
    role?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },

        centerAvatar: {
            margin: 'auto'
        },

        largeAvatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },

        mediumAvatar: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
    }),
);

const ContactCard = (props: IProps) => {

    const classes = useStyles()

    const nameArray = props.name.split(' ')
    let initials: string[] = []

    nameArray.forEach(name => initials.push(name[0].toUpperCase()))

    return (
        <Card elevation={1} className={classes.root}>
            <CardActionArea>
                <CardContent style={{textAlign: 'center'}}>
                    {props.avatar ?
                        <Avatar className={clsx(classes.largeAvatar, classes.centerAvatar)} src={props.avatar}/> :
                        <Avatar className={clsx(classes.orange, classes.largeAvatar, classes.centerAvatar)}>
                            {initials.join("")}
                        </Avatar> }
                    <Typography style={{fontSize: '1.1rem', marginTop: 10}}>
                        <strong>{props.name}</strong>
                    </Typography>
                    {props.role ? <Typography>
                        <small>{props.role}</small>
                    </Typography> : ""}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ContactCard