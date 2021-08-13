import {IJob} from "../../interfaces/IJob";
import {Avatar, Box, Card, CardContent, CardHeader, Divider, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";

import './Jobs.css'
import {longDate} from "../../utils/dateHelpers";
import {Urls} from "../../routes/Urls";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {ChevronRight} from "@material-ui/icons";

interface IProps {
    job: IJob
    showJobDetails?: boolean
    showVewDetailsButton?: boolean
}


const JobListItem = ({job, showJobDetails, showVewDetailsButton}: IProps) => {

    const history = useHistory()
    const [jobId, setJobId] = useState<string>(job.jobId)

    useEffect(() => {
        setJobId(job.jobId ?? job.id)
    }, [job])

    let div = document.createElement("div")
    div.innerHTML = job.details

    const jobDetails = div.textContent || div.innerText || ""

    const salaryArray = []
    let salaryRange = undefined

    if (job.minSalary) salaryArray.push(job.minSalary)
    if (job.maxSalary) salaryArray.push(job.maxSalary)

    if (salaryArray.length)
        salaryRange = salaryArray.join(" - ")

    const handleViewDetails = () => {
        history.push(Urls.jobs.singleJob(jobId))
    }

    return (
        <Box mb={2}>
            <Card className="clickable" elevation={0} onClick={handleViewDetails}>
                <CardHeader
                    // avatar={
                    //     <Avatar src={job.company?.avatar} variant={"square"}>
                    //         {job.company?.name[0].toUpperCase()}
                    //     </Avatar>
                    // }
                    title={
                        <div className="job-title">
                            {job.title}
                        </div>
                    }
                    subheader={
                        <div className="job-category">
                            {job.category?.name}
                        </div>
                    }/>

                <CardContent>
                    <Box mb={3}>
                        <Grid container justify={"flex-start"} spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={2} justify={"flex-start"}>
                                    {
                                        job.location && <Grid xs={12} item className="job-location">
                                            <LocationOnIcon className="job-location-icon"/>
                                            <strong>Location</strong><br/>
                                            <span>{job.location}</span>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {
                                    job.deadline && <Box mb={3}>
                                        <div className="">
                                            <strong>Application deadline</strong><br/>{longDate(job.deadline)}
                                        </div>
                                    </Box>
                                }
                            </Grid>
                        </Grid>
                    </Box>

                    {
                        showJobDetails && <Box mt={3} mb={2}>
                            <div className="job-details-teaser">
                                {jobDetails}
                            </div>
                        </Box>
                    }

                    {
                        showVewDetailsButton && <Box mt={3}>
                            <Grid container spacing={2} justify={"space-between"}>
                                {salaryRange && <Grid className="job-salary-range" item>
                                    <span>{salaryRange}</span>
                                </Grid>}
                                <Grid item>
                                    <Button variant={"outlined"} onClick={handleViewDetails}>
                                        View details <ChevronRight />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobListItem