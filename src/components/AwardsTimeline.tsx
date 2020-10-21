import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Chip} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../theme/styles"
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

interface IAward {
    date: number
    awardedBy: string
    category?: string
    details: string
    location?: string
    attachments?: []
}

interface IProps {
    awards?: any
}

export default function CustomizedTimeline(props: IProps) {
    const classes = useStyles();
    const styles = globalStyles();

    return (
        props.awards ? <Timeline align="alternate">
                {
                    props.awards.map((award: any, index: number) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent>
                                <Typography>
                                    <small style={{color: '#cccccc'}}>
                                        {award.date}
                                    </small>
                                </Typography>
                                <Typography style={{margin: 0}} variant="h5">
                                    {award.awardedBy}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <FastfoodIcon/>
                                </TimelineDot>
                                {++index < props.awards.length ? <TimelineConnector/> : ""}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={0} className={classes.paper}>
                                    <Typography>{award.details}</Typography>
                                    <div style={{marginTop: 15}}>

                                        {award.category ? <Chip
                                            style={{marginRight: 5}}
                                            size="small"
                                            label={award.category}/> : ""}

                                        {award.location ? <Chip size="small" label={award.location}/> : ""}

                                    </div>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }

            </Timeline> :
            <Typography>
                Have you received any awards?
                <Button color="secondary"
                        variant="outlined"
                        style={{marginLeft: 15}}
                        className={clsx(styles.noShadow)}>Boost your profile</Button>
            </Typography>
    );
}