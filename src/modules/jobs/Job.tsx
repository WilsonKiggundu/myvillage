import {IJob} from "../../interfaces/IJob";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import Container from "@material-ui/core/Container";
import {Urls} from "../../routes/Urls";
import AttachmentIcon from '@material-ui/icons/Attachment';
import {applyForJob, getJobById} from "./redux/jobsEndpoints";
import {userSelector} from "../../data/coreSelectors";
import userManager from "../../utils/userManager";
import {longDate, timeAgo} from "../../utils/dateHelpers";
import {useHistory} from "react-router-dom";
import SocialShare from "../../components/SocialShare";
import ViewApplicants from "./ViewApplicants";
import Toast from "../../utils/Toast";
import {getProfileStatus} from "../profiles/people/redux/peopleEndpoints";
import {Alert} from "@material-ui/lab";
import {Stop} from "@material-ui/icons";
import {Endpoints} from "../../services/Endpoints";


const Job = ({match}: any) => {
    const {id} = match.params

    const history = useHistory()
    const user = useSelector(userSelector)

    const [company, setCompany] = useState<any | undefined>(undefined)
    const [job, setJob] = useState<IJob | undefined>(undefined)

    const [applying, setApplying] = useState<boolean>(false)
    const [alreadyApplied, setAlreadyApplied] = useState<boolean>(false)
    const [canApply, setCanApply] = useState<boolean>(true)
    const [canViewApplicants, setCanViewApplicants] = useState<boolean>(false)

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [isIncompleteProfile, setProfileStatus] = useState<boolean>(false)

    const handleApply = async (job: IJob) => {

        if (!user) {
            setOpenSnackbar(true)
        } else {

            setApplying(true)

            try {
                await applyForJob({
                    JobId: job.jobId,
                    applicantId: user.profile.sub
                })

                setApplying(false)
                setAlreadyApplied(true)

            } catch (error) {
                Toast.error(error)
            }
        }
    }

    useEffect(() => {

        (async () => {
            try {

                const profileStatus: any = await getProfileStatus(user.profile.sub)
                setProfileStatus(!profileStatus.body)

                const response: any = await getJobById(id)
                const job = response.body[0]

                document.title = `${job.title} / Jobs`

                setJob(job)

                const {applications, profileId} = job
                const postedByCurrentUser = profileId === user.profile.sub

                if (postedByCurrentUser) {
                    setCanViewApplicants(true)
                } else {
                    const alreadyApplied = applications?.map((m: any) => (m.id))
                        .includes(user.profile.sub)

                    if (alreadyApplied) {
                        setAlreadyApplied(true)
                    } else {
                        setCanApply(true)
                    }
                }

            } catch (e) {
                if (e.toString().includes('Unauthorized')) {
                    await userManager.signinRedirect({
                        state: window.location.pathname
                    })
                }
            }
        })()
    }, [id])

    const handleDownload = (path: string) => {
        window.open(path, '_blank')
    }

    return (
        <Container maxWidth={"md"}>
            <Grid justify={"center"} container spacing={2}>
                <Grid item xs={12}>
                    {job ? (
                        <>
                            <Box mb={2}>
                                <Card>
                                    <CardHeader
                                        // avatar={
                                        //     <Avatar src={company?.avatar} variant={"square"}>
                                        //         {company?.name[0].toUpperCase()}
                                        //     </Avatar>
                                        // }
                                        action={
                                            <div style={{padding: 15}}>
                                                <Button className="apply-button"
                                                        onClick={() => handleApply(job)}
                                                        variant={"contained"}
                                                        disableElevation
                                                        disabled={alreadyApplied || isIncompleteProfile}
                                                        color={"secondary"}>
                                                    {applying ? <CircularProgress color={"inherit"} size={25} /> : "Apply Now"}
                                                </Button>
                                            </div>
                                        }
                                        title={
                                            <div className="job-title">
                                                {job.title}
                                            </div>
                                        }
                                        subheader={
                                            <div className="job-category">
                                                {job.category?.name}, {job.location}
                                            </div>
                                        }/>

                                    {isIncompleteProfile && <CardContent>
                                        <Alert icon={false} title={"Your profile is incomplete"} color={"warning"}>
                                            You are not able to apply for this job because your profile is not
                                            complete. For your profile to be complete, you need to provide the
                                            following information:
                                            <ol>
                                                <li>Contact information</li>
                                                <li>Employment & Education history</li>
                                                <li>Your skill set</li>
                                                <li>Projects you have worked on (for developers)</li>
                                                <li>Your developer stack (for developers)</li>
                                                <li>Your rates (for freelancers)</li>
                                            </ol>
                                            &nbsp;
                                            <a
                                                href={Urls.profiles.onePerson(user.profile.sub)}>
                                                Complete your profile &rarr;</a>
                                        </Alert>
                                    </CardContent>}

                                    <Divider/>

                                    <CardContent>
                                        <Grid spacing={2} container justify={"flex-start"}>
                                            {company?.name && <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Company</strong><br/>
                                                <a href={Urls.profiles.singleStartup(company?.id)}>{company?.name}</a>
                                            </Grid>}
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Job Category</strong><br/>
                                                {job.category?.name}
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Job type</strong><br/>
                                                {job.jobType}
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Salary range</strong><br/>
                                                {job.minSalary} - {job.maxSalary}
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Experience</strong><br/>
                                                {job.experience}
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Application deadline</strong><br/>
                                                {longDate(job.deadline)}
                                            </Grid>
                                        </Grid>


                                    </CardContent>

                                    <Divider/>

                                    <SocialShare description={
                                        `at ${job.company ? job.company.name : job.companyId}. Closes on ${longDate(job.deadline)}`
                                    } title={"#JobOpportunity " + job.title}/>

                                    {canViewApplicants && <ViewApplicants job={job} />}

                                </Card>
                            </Box>

                            <Box mb={2}>
                                <Card>
                                    <CardHeader title={
                                        <div className="job-card-title">Job description</div>
                                    }/>
                                    <Divider/>
                                    <CardContent>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: job.details
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>

                            {
                                job.qualifications && <Box mb={2}>
                                    <Card>
                                        <CardHeader title={
                                            <div className="job-card-title">Qualifications</div>
                                        }/>
                                        <Divider/>
                                        <CardContent>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: job.qualifications
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            }

                            {
                                job.skills && <Box mb={2}>
                                    <Card>
                                        <CardHeader title={
                                            <div className="job-card-title">Required skills</div>
                                        }/>
                                        <Divider/>
                                        <CardContent>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: job.skills
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            }

                            {
                                job.benefits && <Box mb={2}>
                                    <Card>
                                        <CardHeader title={
                                            <div className="job-card-title">Benefits</div>
                                        }/>
                                        <Divider/>
                                        <CardContent>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: job.benefits
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            }

                            {
                                job.uploads?.length ? <Box mb={2}>
                                    <Card>
                                        <CardHeader title={
                                            <div>Attachments</div>
                                        }/>
                                        <CardContent>
                                            <List>
                                                {
                                                    job.uploads?.map((upload: any, index: number) => (
                                                        <div key={index}>
                                                            <ListItem
                                                                onClick={() => handleDownload(upload.path)}
                                                                button>
                                                                <ListItemIcon>
                                                                    <AttachmentIcon/>
                                                                </ListItemIcon>
                                                                <ListItemText primary={upload.name}/>
                                                            </ListItem>
                                                            <Divider/>
                                                        </div>
                                                    ))
                                                }
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Box> : ""
                            }
                        </>

                    ) : <PleaseWait label={"Please wait while we fetch the job details..."}/>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Job
