import {IJob} from "../../interfaces/IJob";
import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
import {differenceInCalendarDays} from "date-fns";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useDispatch, useSelector} from "react-redux";
import store from "../../data/store";
import {jobSelector, jobsSelector} from "./redux/jobsSelectors";
import {loadJobs} from "./redux/jobsActions";
import {PleaseWait} from "../../components/PleaseWait";
import {longDate, timeAgo} from "../../utils/dateHelpers";
import Container from "@material-ui/core/Container";
import {globalStyles} from "../../theme/styles";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import Divider from "@material-ui/core/Divider";
import StartupCard from "../profiles/startups/StartupCard";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import {homeStyles} from "../home/styles";

const Job = ({match}: any) => {

    const classes = homeStyles()
    const jobId = match.params.id
    const id = parseInt(jobId, 10)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [company, setCompany] = useState<any | undefined>(undefined)

    const jobs = useSelector(jobsSelector)
    let job = useSelector((state) => jobSelector(state, id))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadJobs())
    }, [dispatch])

    useEffect(() => {
        if (job) {
            getStartups({id: job.companyId})
                .then((response: any) => {
                    setCompany(response.body.startups[0])
                })
        }
    }, [job])

    if (!job) {
        job = store.getState().jobs.data.find((job: IJob) => job.id === id)
    }

    return (
        <Container className={classes.scrollable} maxWidth={false}>
            <Grid justify={"center"} container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        {job ? (
                            <Card>
                                <CardHeader
                                    title={
                                        <Typography style={{marginBottom: 2}} variant={"h4"}>
                                            <strong>{job.title}</strong>
                                        </Typography>
                                    }
                                    subheader={job.category?.name}
                                />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Divider/>
                                        <Grid style={{color: grey[500]}} item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <LocationOnIcon/>
                                                </Grid>
                                                <Grid style={{marginTop: 3}} item>
                                                    {job.location}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid style={{marginBottom: 15}} item xs={12}>
                                            <Alert color={
                                                differenceInCalendarDays(Date.parse(job.deadline?.replace(/ /g, "T")), new Date()) <= 1 ? "warning" : "info"
                                            } icon={<CalendarTodayIcon/>}>
                                                Application closes on <br/>
                                                <strong>{longDate(job.deadline)}</strong> ({timeAgo(job.deadline)})
                                            </Alert>
                                        </Grid>

                                        <Grid style={{marginBottom: 15}} xs={12} lg={10} item>
                                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                                <strong>Job Description</strong>
                                                <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                    {job.details}
                                                </Typography>
                                            </Typography>
                                        </Grid>

                                        <Grid style={{marginBottom: 15}} item xs={12}>
                                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                                <strong>Qualifications</strong>
                                                <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                    {job.qualifications}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid style={{marginBottom: 15}} item xs={12}>
                                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                                <strong>Experience</strong>
                                                <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                    {job.experience}
                                                </Typography>
                                            </Typography>

                                        </Grid>
                                        <Grid style={{marginBottom: 15}} item xs={12}>
                                            <Typography style={{margin: '15px 0'}} variant={"h6"}>
                                                <strong>How to apply</strong>
                                                <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                    {job.howToApply}
                                                </Typography>
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        ) : <PleaseWait/>}
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <StartupCard {...company} />
                    </Grid>
                </Grid>
        </Container>
    )
}

export default Job