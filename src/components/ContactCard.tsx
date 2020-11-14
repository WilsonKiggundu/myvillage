import {Card, createStyles, Theme} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import clsx from "clsx";
import {IPerson, Person} from "../modules/profiles/people/IPerson";

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
    const person = new Person(props.person)

    return (
        <Card elevation={1}>
                <CardContent style={{textAlign: 'center'}}>

                    {person.person.avatar ?
                        <Avatar className={clsx(classes.largeAvatar, classes.centerAvatar)} src={person.person.avatar}/> :
                        <Avatar className={clsx(classes.orange, classes.largeAvatar, classes.centerAvatar)}>
                            {person.initials}
                        </Avatar> }
                    <Typography noWrap component="div" style={{fontSize: '1.1rem', marginTop: 10}}>
                        <strong>{person.fullName}</strong>
                    </Typography>
                    {/*{props.role ? <Typography noWrap component="div">*/}
                    {/*    <small>{props.role}</small>*/}
                    {/*</Typography> : ""}*/}

                    {props.children}

                </CardContent>
        </Card>
    )
}

export default ContactCard