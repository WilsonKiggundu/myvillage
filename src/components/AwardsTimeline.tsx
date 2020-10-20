import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Chip} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {globalStyles} from "../theme/styles"
import clsx from "clsx";
import {format} from "date-fns";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

interface IAward{
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
                 props.awards.map((award: any, index: any) => (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography>
                                <small style={{color: '#cccccc'}}>
                                    {award.date}
                                </small>
                                <h3 style={{margin: 0}}>{award.awardedBy}</h3>
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <FastfoodIcon />
                            </TimelineDot>
                            {++index < props.awards.length ? <TimelineConnector/> : ""}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={0} className={classes.paper}>
                                <Typography>{award.details}</Typography>
                                <Typography style={{marginTop: 15}} paragraph>

                                    {award.category ? <Chip
                                        style={{marginRight: 5}}
                                        size="small"
                                        label={award.category}/> : ""}

                                    {award.location ? <Chip size="small" label={award.location}/> : ""}

                                </Typography>
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