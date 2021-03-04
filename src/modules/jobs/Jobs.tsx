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
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";


const schema = yup.object().shape(
    {}
)

const initialValues = {}

const Jobs = () => {

    const [openJobDialog, setOpenJobDialog] = useState<boolean>(false)

    const history = useHistory()
    const dispatch = useDispatch()
    const jobs = useSelector(jobsSelector)
    const user = useSelector(userSelector)

    const [canCreateJob, setCanCreateJob] = useState<boolean>(false)
    const [categories, setCategories] = useState<any>([])

    const handleSubmit = () => {

    }

    useEffect(() => {
        dispatch(loadJobs())
    }, [dispatch])

    useEffect(() => {
        (async () => {
            getStartups({personId: user?.profile?.sub})
                .then((response: any) => {
                    if (response.status === 200 && response.body.startups.length) {
                        setCanCreateJob(true)
                    } else {
                        setOpenJobDialog(false)
                    }
                }).catch(error => {
                if (error.toString().indexOf('Unauthorized') != -1) {
                    userManager.signinRedirect()
                }
            })
        })()
    }, [setCanCreateJob])

    const handleViewJob = (id: string) => {
        const url = Urls.jobs.singleJob(id)
        history.push(url)
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
            <Grid container spacing={2} justify={"center"}>

                <Grid xs={12} item>
                    <div className="headline">Search for your next job</div>
                    <div className="filter-container">

                        <Grid spacing={2} container>
                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    size={"small"}
                                    id="job-category"
                                    className="job-category-selector"
                                    options={categories}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Category" variant="filled"/>}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    size={"small"}
                                    id="job-category"
                                    className="job-company-selector"
                                    options={categories}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Company" variant="filled"/>}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    size={"small"}
                                    id="job-category"
                                    className="job-location-selector"
                                    options={categories}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Location" variant="filled"/>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    {jobs && jobs.data.map((job: IJob, index: number) => <JobListItem
                        key={index}
                        job={job}
                        showJobDetails
                        showVewDetailsButton
                    />)}
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