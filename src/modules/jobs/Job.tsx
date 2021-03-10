import {IJob} from "../../interfaces/IJob";
import React, {useEffect, useState} from "react";
import {Box, Button, Card, CircularProgress, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import store from "../../data/store";
import {jobSelector} from "./redux/jobsSelectors";
import {loadJobs} from "./redux/jobsActions";
import {PleaseWait} from "../../components/PleaseWait";
import Container from "@material-ui/core/Container";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {LazyLoadImage} from "react-lazy-load-image-component";
import XTabbedPanel, {ITab} from "../../components/tabs/XTabbedPanel";

const Job = ({match}: any) => {

    const jobId = match.params.id
    const id = parseInt(jobId, 10)
    const [company, setCompany] = useState<any | undefined>(undefined)

    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = useState<ITab[]>([])
    const [applyButton, setApplyButton] = useState<any>({label: 'Apply now', disabled: false})

    const handleChange = ({event, newValue}: any) => {
        setValue(newValue);
    };

    const handleApply = (job: IJob) => {
        setApplyButton({
            disabled: true,
            label: <CircularProgress size={25} />
        })
    }

    let job: IJob = useSelector((state) => jobSelector(state, id))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadJobs())
    }, [dispatch])

    useEffect(() => {
        if (job) {

            setTabs([
                {
                    label: 'Job description',
                    content: job.details
                },
                {
                    label: 'Qualifications & Experience',
                    content: <>
                        <Typography>{job.qualifications}</Typography>
                        <Typography>{job.experience}</Typography>
                    </>
                },
                {
                    label: 'Benefits',
                    content: job.benefits
                },
            ])

            document.title = `${job.title} / My Village`

            getStartups({id: job.companyId})
                .then((response: any) => {
                    setCompany(response.body.startups[0])
                })
                .catch((error) => {

                })
        }
    }, [job])

    useEffect(() => {
        if (company) {
            document.title = `${job.title} / ${company.name} / My Village`
        }
    })

    if (!job) {
        job = store.getState().jobs.data.find((job: IJob) => job.id === id)
    }

    return (
        <Container maxWidth={"md"}>
            <Grid justify={"center"} container spacing={2}>
                <Grid item xs={12}>
                    {job ? (

                        <>
                            <Box mb={2}>
                                <Card>
                                    <CardContent>
                                        <Grid spacing={2} container justify={"space-between"}>
                                            <Grid item xs={4} md={2}>
                                                <LazyLoadImage
                                                    width={'100%'}
                                                    className="company-logo"
                                                    src={company?.avatar}
                                                    alt={company?.name}
                                                    effect={'blur'}
                                                />
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                <div className="job-title">{job.title}</div>
                                                <div className="job-category">
                                                    {job.category?.name}
                                                </div>

                                                <Box mt={2}>
                                                    <Grid container spacing={4} justify={"flex-start"}>
                                                        <Grid item className="company-name">
                                                            <a href="">{company?.name}</a>
                                                        </Grid>
                                                        <Grid item className="job-location">
                                                            <LocationOnIcon className="job-location-icon"/>
                                                            <span>{job.location}</span>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <Button className="apply-button"
                                                        onClick={() => handleApply(job)}
                                                        variant={"contained"}
                                                        disabled={applyButton.disabled}
                                                        color={"secondary"}>
                                                    {applyButton.label}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>

                            <Box mb={2}>
                                <Card>
                                    <CardContent>
                                        <Grid spacing={2} container justify={"flex-start"}>
                                            {job.engagement && <Grid item xs={12} md={4}>
                                                <strong>Engagement</strong><br/>
                                                {job.engagement}
                                            </Grid>}
                                            <Grid item xs={12} md={4}>
                                                <strong>Category</strong><br/>{job.category?.name}
                                            </Grid>
                                            {job.salaryRange && <Grid item xs={12} md={4}>
                                                <strong>Salary range</strong><br/>
                                                {job.salaryRange}
                                            </Grid>}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>

                            <Box mb={2}>
                                <XTabbedPanel tabs={tabs}/>
                            </Box>
                        </>

                    ) : <PleaseWait/>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Job