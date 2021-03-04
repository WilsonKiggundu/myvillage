import {IJob} from "../../interfaces/IJob";
import {Box, Card, CardContent, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";

import './Jobs.css'
import {longDate} from "../../utils/dateHelpers";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {IStartup} from "../../interfaces/IStartup";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import {Urls} from "../../routes/Urls";

interface IProps {
    job: IJob
    showJobDetails?: boolean
    showVewDetailsButton?: boolean
}


const JobListItem = ({job, showJobDetails, showVewDetailsButton}: IProps) => {

    const [company, setCompany] = useState<IStartup | undefined>(undefined)

    useEffect(() => {
        (async () => {
            const response: any = await getStartups({id: job.companyId})
            const {startups} = response.body
            if (startups.length) {
                setCompany(startups[0])
            }
        })()
    }, [setCompany, job.companyId])

    return (
        <Box mb={2}>
            <Card>
                <CardContent>
                    <Grid spacing={2} container justify={"flex-start"}>
                        <Grid item sm={2}>
                            <LazyLoadImage
                                width={'100%'}
                                className="company-logo"
                                src={company?.avatar}
                                alt={company?.name}
                                effect={'blur'}
                            />
                        </Grid>
                        <Grid item sm={10}>
                            <Box mb={3}>
                                <Grid container justify={"space-between"}>
                                    <Grid item>
                                        <div className="job-title">{job.title}</div>
                                        <div className="job-category">
                                            {job.category?.name}
                                        </div>
                                    </Grid>
                                    <Grid className="job-deadline" item>
                                        {longDate(job.deadline)}
                                    </Grid>
                                </Grid>

                            </Box>
                            <Box mb={3}>
                                <Grid container spacing={4} justify={"flex-start"}>
                                    <Grid item className="company-name">
                                        <a href="">{company?.name}</a>
                                    </Grid>
                                    <Grid item className="job-location">
                                        <LocationOnIcon className="job-location-icon"/> <span>{job.location}</span>
                                    </Grid>
                                </Grid>
                            </Box>
                            {
                                showJobDetails && <Box mb={2}>
                                    <div className="job-details-teaser">
                                        {job.details}
                                    </div>
                                </Box>
                            }

                            {
                                showVewDetailsButton && <Box>
                                    <Grid container justify={"space-between"}>
                                        <Grid className="job-salary-range" item>
                                            <span>UGX 1,000,000 - UGX 1,500,000</span>
                                        </Grid>
                                        <Grid item>
                                            <a href={Urls.jobs.singleJob(job.id)} className="job-details-button">
                                                View details
                                            </a>
                                        </Grid>
                                    </Grid>
                                </Box>
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JobListItem