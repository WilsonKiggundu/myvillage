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
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

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
        <Box mb={2}>
            <Typography style={{padding: '15px 0'}}>Awards &amp; Achievements</Typography>
            <Card>
                <CardContent style={{paddingTop: 25}}>
                    {props.awards ?
                        <Grid spacing={1} container>
                            {
                                props.awards.map((award: any, index: number) => (
                                    <>
                                        <Grid xs={2} sm={1} item>
                                            <Avatar variant={"square"}/>
                                        </Grid>
                                        <Grid xs={10} sm={11} item>
                                            <Typography component={"h5"}>
                                                <strong>{award.awardedBy}</strong>
                                            </Typography>
                                            <Typography variant={"body2"}>
                                                {award.award}
                                            </Typography>
                                            <Typography variant={"body2"} style={{color: grey[800]}}>
                                                <small>{award.date}</small>
                                            </Typography>
                                            <Typography style={{color: grey[700]}} variant={"body2"}>
                                                {award.details}
                                            </Typography>
                                            <Divider
                                                variant={"fullWidth"}
                                                style={{margin: '15px 0', display: index + 1 < props.awards.length ? 'block' : 'none'}}/>
                                        </Grid>

                                    </>
                                ))
                            }
                        </Grid> :
                        <Typography>
                            Have you received any awards?
                            <Button color="secondary"
                                    variant="outlined"
                                    style={{marginLeft: 15}}
                                    className={clsx(styles.noShadow)}>Boost your profile</Button>
                        </Typography>
                    }
                </CardContent>
            </Card>
        </Box>
    );
}