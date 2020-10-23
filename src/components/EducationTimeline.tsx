import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import SchoolIcon from '@material-ui/icons/School';
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
        backgroundColor: theme.palette.primary.main,
    },
}));

interface IQualification {
    id: string
    award: string
    year: string
    month: string
    details?: string
    institution: string
}

interface IProps {
    qualifications?: any
}

export default function EducationTimeline(props: IProps) {
    const classes = globalStyles();

    return (
        props.qualifications ? <Timeline align="left">
                {
                    props.qualifications.map((award: any, index: number) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent style={{flex: 0.3}}>
                                <Typography>
                                    <small style={{color: '#cccccc'}}>
                                        {award.month}
                                    </small>
                                </Typography>
                                <Typography style={{margin: 0}}>
                                    {award.year}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot className={classes.noShadow} color="secondary">
                                    <SchoolIcon/>
                                </TimelineDot>
                                {++index < props.qualifications.length ? <TimelineConnector/> : ""}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={0} >
                                    <Typography variant={"h6"} component={"h5"}>
                                        {award.institution}
                                    </Typography>
                                    <Typography paragraph>{award.award}</Typography>

                                    <Typography paragraph>
                                        <small>{award.details}</small>
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
                        className={clsx(classes.noShadow)}>Boost your profile</Button>
            </Typography>
    );
}