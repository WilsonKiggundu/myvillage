import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {XFab} from "../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add"
import NewJob from "./forms/NewJob";
import XDialog from "../../components/dialogs/XDialog";
import {IJob} from "../../interfaces/IJob";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import {jobsSelector} from "./redux/jobsSelectors";
import Typography from "@material-ui/core/Typography";
import {globalStyles} from "../../theme/styles";
import {loadJobs} from "./redux/jobsActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {Urls} from "../../routes/Urls";
import {longDate} from "../../utils/dateHelpers";
import ErrorPage from "../exceptions/Error";
import {homeStyles} from "../home/styles";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import {userSelector} from "../../data/coreSelectors";


const Jobs = () => {

    const [openJobDialog, setOpenJobDialog] = useState<boolean>(false)

    const classes = globalStyles()
    const styles = homeStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const jobs = useSelector(jobsSelector)
    const user = useSelector(userSelector)

    const [canCreateJob, setCanCreateJob] = useState<boolean>(false)

    useEffect(() => {
        dispatch(loadJobs())
    }, [dispatch])

    useEffect(() => {
        (async () => {
            getStartups({personId: user.profile.sub})
                .then((response: any) => {
                    if(response.status === 200 && response.body.startups.length){
                        setCanCreateJob(true)
                    }else{
                        setOpenJobDialog(false)
                    }
                })
        })()
    }, [setCanCreateJob])

    const handleViewJob = (id: string) => {
        const url = Urls.jobs.singleJob(id)
        history.push(url)
    }

    const handleScroll = (e: any) => {
        const element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            if (jobs.request.hasMore) {
                dispatch(loadJobs())
            }
        }
    }

    if (jobs.isLoading) return <PleaseWait/>
    if (jobs.error) return (
        <ErrorPage title={"Loading jobs failed"} message={jobs.error} />
    )

    return (
        <Container onScroll={handleScroll} className={styles.scrollable} maxWidth={false}>
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={12} lg={6}>
                    {jobs ?
                        jobs.data.map((job: IJob, index: number) =>
                            (
                                <Box key={index} mt={2}>
                                    <Card>
                                        <CardContent>
                                            <Grid spacing={3} container>
                                                <Grid item xs={12}>
                                                    <Typography variant={"h5"}>
                                                        {job.title}
                                                    </Typography>
                                                    <Typography variant={"caption"}>
                                                        {job.category?.name} {job.location}
                                                    </Typography>
                                                    <Box mt={2}>
                                                        <Typography
                                                            variant={"body2"}
                                                            className={classes.maxLines}>
                                                            {job.details}
                                                        </Typography>
                                                    </Box>
                                                    {job.deadline ? (
                                                        <Typography variant={"caption"}>
                                                            <strong>Application deadline</strong><br/>
                                                            {longDate(job.deadline)}
                                                        </Typography>
                                                    ) : ""}

                                                    <Box mt={4}>
                                                        <Button
                                                            onClick={() => handleViewJob(job.id)}
                                                            color={"secondary"}
                                                            size={"small"}
                                                            variant={"outlined"}>
                                                            View details
                                                        </Button>
                                                    </Box>

                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Box>
                            )
                        )
                        : ""
                    }
                </Grid>
            </Grid>

            {canCreateJob ? <>
                <XFab
                    onClick={() => setOpenJobDialog(true)}
                    position={"fixed"}
                    bottom={20}
                    right={20}
                    color={"secondary"}>
                    <AddIcon/>
                </XFab>

                <XDialog
                    maxWidth={"md"}
                    title={"Add a new job"}
                    open={openJobDialog}
                    onClose={() => setOpenJobDialog(false)}>
                    <NewJob onClose={() => setOpenJobDialog(false)}/>
                </XDialog>
            </> : ""}

        </Container>
    )
}

export default Jobs