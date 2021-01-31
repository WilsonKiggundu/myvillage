import {Card, createStyles, Theme} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import clsx from "clsx";
import {getInitials, IPerson} from "../modules/profiles/people/IPerson";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";

interface IProps {
    children?: any
    person: IPerson
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
            borderColor: deepOrange[500],
            borderWidth: 1,
            borderStyle: 'solid'
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
        },

        centerAvatar: {
            margin: 'auto'
        },

        largeAvatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },

        mediumAvatar: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
    }),
);

const ContactCard = (props: IProps) => {

    const classes = useStyles()
    const {firstname, lastname, avatar, coverPhoto} = props.person


    return (
        <Card>

            {
                coverPhoto ?
                    <CardMedia style={{height: 150}} image={coverPhoto}/> :
                    <Box style={{height: 150, backgroundColor: grey[300]}}/>
            }

            <CardContent style={{textAlign: 'center', marginTop: -80}}>

                <Avatar src={avatar} className={clsx(classes.orange, classes.largeAvatar, classes.centerAvatar)}>
                    {getInitials(firstname, lastname)}
                </Avatar>

                <Typography noWrap component="div" style={{fontSize: '1.3rem', marginTop: 10}}>
                    <strong>{firstname} {lastname}</strong>
                </Typography>

                {props.children}

            </CardContent>
        </Card>
    )
}

export default ContactCard