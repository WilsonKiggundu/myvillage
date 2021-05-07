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
import {loadJobs} from "./redux/jobsActions";
import {useHistory} from "react-router-dom";
import {Urls} from "../../routes/Urls";
import ErrorPage from "../exceptions/Error";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import {userSelector} from "../../data/coreSelectors";
import {scrolledToBottom} from "../../utils/scrollHelpers";
import JobListItem from "./JobListItem";
import userManager from "../../utils/userManager";
import * as yup from "yup";
import {Alert, Autocomplete} from "@material-ui/lab";
import {Button, Snackbar, TextField, useMediaQuery, useTheme} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import JobFilter from "./forms/JobFilter";
import { handleLogin } from "../../utils/authHelpers";


const schema = yup.object().shape(
    {}
)

const initialValues = {}

const Jobs = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const jobs = useSelector(jobsSelector)
    const user = useSelector(userSelector)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [canCreateJob, setCanCreateJob] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    useEffect(() => {
        dispatch(loadJobs())
    }, [dispatch])

    const handleViewJob = (id: string) => {
        const url = Urls.jobs.singleJob(id)
        history.push(url)
    }

    const handleCreate = () => {
        window.location.replace(Urls.jobs.create)
    }

    useEffect(() => {
        document.title = "Jobs / My Village"
        window.addEventListener('scroll', () => {
            if (jobs.request.hasMore && scrolledToBottom()) {
                dispatch(loadJobs())
            }
        })
    })

    if (jobs.isLoading) return <PleaseWait label={"Loading jobs..."}/>
    if (jobs.error) return (
        <ErrorPage title={"Loading jobs failed"} message={jobs.error}/>
    )

    return (
        <Container maxWidth={"md"}>

            <JobFilter />

            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={12}>
                    {jobs && jobs.data.map((job: IJob, index: number) => <JobListItem
                        key={index}
                        job={job}
                        showJobDetails
                        showVewDetailsButton
                    />)}
                </Grid>
            </Grid>

            <>
                <XFab
                    disabled={!user}
                    variant={isMobile ? "round" : "extended"}
                    onClick={handleCreate}
                    position={"fixed"}
                    bottom={20}
                    right={20}
                    color={"primary"}>
                    <AddIcon/> {!isMobile && <span className="text-inherit">Post a job</span>}
                </XFab>

                {/*<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>*/}
                {/*    <Alert onClose={() => setOpenSnackbar(false)} severity="warning">*/}
                {/*        You need to be logged in to post a job. &nbsp;&nbsp;*/}
                {/*        <Button onClick={handleLogin} size={"small"} variant={"outlined"} color={"secondary"}>*/}
                {/*            Continue to login*/}
                {/*        </Button>*/}
                {/*    </Alert>*/}
                {/*</Snackbar>*/}

            </>

        </Container>
    )
}

export default Jobs