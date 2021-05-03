import {IJob} from "../../interfaces/IJob";
import {Avatar, Box, Card, CardContent, CardHeader, Divider, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";

import './Jobs.css'
import {longDate} from "../../utils/dateHelpers";
import {IStartup} from "../../interfaces/IStartup";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import {Urls} from "../../routes/Urls";
import { useHistory } from "react-router-dom";

interface IProps {
    job: IJob
    showJobDetails?: boolean
    showVewDetailsButton?: boolean
}


const JobListItem = ({job, showJobDetails, showVewDetailsButton}: IProps) => {

    const history = useHistory()
    // const [company, setCompany] = useState<IStartup | undefined>(undefined)

    // useEffect(() => {
    //     (async () => {
    //         const response: any = await getStartups({id: job.companyId})
    //         const {startups} = response.body
    //         if (startups.length) {
    //             setCompany(startups[0])
    //         }
    //     })()
    // }, [setCompany, job.companyId])

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
        history.push(Urls.jobs.singleJob(job.id))
    }

    return (
        <Box className="clickable" onClick={handleViewDetails} mb={2}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar src={job.company?.avatar} variant={"square"}>
                            {job.company?.name[0].toUpperCase()}
                        </Avatar>
                    }
                    title={
                        <div className="job-title">
                            {job.title}
                        </div>
                    }
                    subheader={
                        <div className="job-category">
                            {job.company?.name}, {job.category?.name}
                        </div>
                    }/>

                <Divider/>

                <CardContent>
                    <Box mb={3}>
                        <Grid container justify={"space-between"} spacing={2}>
                            <Grid item>
                                <Grid container spacing={2} justify={"flex-start"}>
                                    {
                                        job.location && <Grid xs={12} item className="job-location">
                                            <LocationOnIcon className="job-location-icon"/> <span>{job.location}</span>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item>
                                {
                                    job.deadline && <Box mb={3}>
                                        <div className="job-deadline">
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

                    <Divider />

                    {
                        showVewDetailsButton && <Box mt={3}>
                            <Grid container spacing={2} justify={"space-between"}>
                                <Grid className="job-salary-range" item>
                                    {salaryRange && <span>{salaryRange}</span>}
                                </Grid>
                                <Grid item>
                                    <a href={Urls.jobs.singleJob(job.id)} className="job-details-button">
                                        View details
                                    </a>
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