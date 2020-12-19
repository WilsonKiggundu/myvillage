import {IJob} from "../../interfaces/IJob";
import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
import {differenceInCalendarDays, format, formatDistanceToNow} from "date-fns";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

interface IProps {
    job: IJob
}

const Job = ({job}: IProps) => {
    return (
        <Box mb={4}>
            <Card>
                <CardHeader
                    title={
                        <Typography style={{marginBottom: 10}} variant={"h4"}>
                            <strong>{job.title}</strong>
                        </Typography>
                    }
                    subheader={
                        <Chip size={"small"} label={job.category?.name} />
                    }
                />
                <CardContent>
                    <Grid container>
                        <Grid style={{marginBottom: 15}} item xs={12}>
                            <Alert color={
                                differenceInCalendarDays(Date.parse(job.deadline?.replace(/ /g,"T")), new Date()) <= 1 ? "warning" : "info"
                            } icon={false}>
                                Application deadline is
                                on <strong>{format(Date.parse(job.deadline?.replace(/ /g,"T")), "PPPP")}</strong> ({formatDistanceToNow(Date.parse(job.deadline?.replace(/ /g,"T")))} from
                                now)
                            </Alert>
                        </Grid>

                        <Grid style={{marginBottom: 15}} xs={12} item>
                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                <strong>What you'll do</strong>
                            </Typography>
                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                {job.details}
                            </Typography>
                        </Grid>

                        <Grid style={{marginBottom: 15}} item xs={12}>
                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                <strong>What you'll bring</strong>
                            </Typography>
                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                {job.qualifications}
                            </Typography>
                        </Grid>
                        <Grid style={{marginBottom: 15}} item xs={12}>
                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                <strong>The experience</strong>
                            </Typography>
                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                {job.experience}
                            </Typography>
                        </Grid>
                        <Grid style={{marginBottom: 15}} item xs={12}>
                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                <strong>How to apply</strong>
                            </Typography>
                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                {job.howToApply}
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Job