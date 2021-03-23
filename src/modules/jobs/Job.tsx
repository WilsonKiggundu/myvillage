import {IJob} from "../../interfaces/IJob";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import Container from "@material-ui/core/Container";
import {getStartups} from "../profiles/startups/redux/startupsEndpoints";
import {Urls} from "../../routes/Urls";
import AttachmentIcon from '@material-ui/icons/Attachment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {applyForJob, getJobById} from "./redux/jobsEndpoints";
import {userSelector} from "../../data/coreSelectors";
import Toast from "../../utils/Toast";
import userManager from "../../utils/userManager";
import XDrawer, {Anchor} from "../../components/drawer/XDrawer";
import {getAsync, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPerson} from "../profiles/people/IPerson";
import {IApplicant} from "../../interfaces/IApplicant";
import {timeAgo} from "../../utils/dateHelpers";
import {useHistory} from "react-router-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import {SendApplicationNotification} from "./jobHelpers";


const Job = ({match}: any) => {

    const history = useHistory()
    const user = useSelector(userSelector)
    const id = parseInt(match.params.id, 10)
    const [company, setCompany] = useState<any | undefined>(undefined)
    const [job, setJob] = useState<IJob | undefined>(undefined)

    const [applyButton, setApplyButton] = useState<any>({label: 'Apply now', visible: true, disabled: false})
    const [alreadyApplied, setAlreadyApplied] = useState<boolean>(false)
    const [canApply, setCanApply] = useState<boolean>(false)
    const [canViewApplicants, setCanViewApplicants] = useState<boolean>(false)

    const [allApplications, setAllApplications] = useState<any>([])
    const [acceptedApplications, setAcceptedApplications] = useState<any>([])
    const [rejectedApplications, setRejectedApplications] = useState<any>([])
    const [pendingApplications, setPendingApplications] = useState<any>([])

    const handleApply = async (job: IJob) => {
        setApplyButton({
            disabled: true,
            label: <CircularProgress size={25}/>
        })

        try {
            await applyForJob({
                id: job.id,
                profileId: user.profile.sub
            })

            // send email notification to the job owner
            await SendApplicationNotification(job, user)

        } catch (error) {
            Toast.error(error.toString())
        } finally {
            setApplyButton({
                visible: false
            })
        }
    }

    useEffect(() => {

        (async () => {
            try {

                const response: any = await getJobById(id)
                const res: any = await getStartups({id: response.body.companyId})

                setCompany(res.body.startups[0])

                const job = response.body
                setJob(job)

                const {applicants, profileId} = job

                const alreadyApplied = applicants?.map((m: any) => (m.profileId)).includes(user.profile.sub)
                const postedByCurrentUser = profileId === user.profile.sub

                setAlreadyApplied(alreadyApplied)
                setCanApply(!postedByCurrentUser || !alreadyApplied)
                setCanViewApplicants(postedByCurrentUser)

                document.title = `${response.body.title} / My Village`

            } catch (e) {

                if (e.toString().includes('Unauthorized')) {
                    await userManager.signinRedirect({
                        state: window.location.pathname
                    })
                }
            } finally {

            }

        })()
    }, [id])

    const handleDownload = (path: string) => {
        window.open(path, '_blank')
    }

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [drawerAnchor, setDrawerAnchor] = useState<Anchor>("right")
    const [applicants, setApplicants] = useState<IApplicant[] | undefined>(undefined)

    const toggleDrawer = async (anchor: Anchor, open: boolean) => {
        setOpenDrawer(open)
        setDrawerAnchor(anchor)

        if (open) {
            const applicants: IApplicant[] | undefined = []
            const url = makeUrl("Profiles", Endpoints.person.base)

            if (job?.applicants) {

                await Promise.all(job.applicants.map(async (application: any) => {
                    const response: any = await getAsync(url, {id: application.profileId})
                    const person: IPerson = response.body.persons[0]
                    applicants.push({
                        id: application.id,
                        avatar: person.avatar ?? "",
                        profileId: application.profileId,
                        date: timeAgo(application.dateTime),
                        name: person.firstname + " " + person.lastname,
                        status: application.status
                    })
                }))

                setAllApplications(applicants)
                setAcceptedApplications(applicants.filter((f: IApplicant) => f.status === 'accepted'))
                setRejectedApplications(applicants.filter((f: IApplicant) => f.status === 'rejected'))
                setPendingApplications(applicants.filter((f: IApplicant) => !f.status))

                setApplicants(applicants)
            }

        }

    }

    const handleViewApplicant = (id: string, applicationId: any, status: string, jobName: string) => {
        const query: any = {
            jobId: job?.id,
            jobName: jobName,
            applicationId: applicationId,
            status: status,
            context: "job_application"
        }

        const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        const url = Urls.profiles.onePerson(id)
        history.push({
            pathname: url,
            search: `?${queryString}`
        })
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
                                        avatar={
                                            <Avatar src={company?.avatar} variant={"square"}>
                                                {company?.name[0].toUpperCase()}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton>
                                                <MoreVertIcon/>
                                            </IconButton>
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
                                        </Grid>
                                    </CardContent>

                                    <Divider/>

                                    <CardContent>
                                        <Grid container justify={"center"}>
                                            <Grid item>
                                                {
                                                    canApply && alreadyApplied &&
                                                    <span>You have already applied for this job.</span>
                                                }

                                                {
                                                    canApply && !alreadyApplied &&
                                                    <Button className="apply-button"
                                                            onClick={() => handleApply(job)}
                                                            variant={"contained"}
                                                            disabled={applyButton.disabled}
                                                            color={"secondary"}>
                                                        {applyButton.label}
                                                    </Button>
                                                }

                                                {
                                                    canViewApplicants &&
                                                    <>
                                                        <Button
                                                            onClick={() => toggleDrawer("right", true)}
                                                            color={"default"}
                                                            variant={"outlined"}>
                                                            {job.applicants?.length} applicants
                                                        </Button>

                                                        <XDrawer
                                                            onClose={() => toggleDrawer("right", false)}
                                                            open={openDrawer}
                                                            anchor={drawerAnchor}>
                                                            <div className="Drawer">
                                                                {
                                                                    applicants ?
                                                                        <>

                                                                            <List
                                                                                subheader={
                                                                                    <ListSubheader
                                                                                        className="Drawer-subheader">
                                                                                        Applications
                                                                                    </ListSubheader>
                                                                                }>

                                                                                <div
                                                                                    className="application-button-group">
                                                                                    <ButtonGroup color={"default"}>
                                                                                        <Button
                                                                                            onClick={() => setApplicants(allApplications)}>
                                                                                            All
                                                                                            ({allApplications.length})
                                                                                        </Button>
                                                                                        {
                                                                                            pendingApplications.length ?
                                                                                                <Button
                                                                                                    onClick={() => setApplicants(pendingApplications)}
                                                                                                >
                                                                                                    Pending
                                                                                                    ({pendingApplications.length})
                                                                                                </Button> : ""
                                                                                        }
                                                                                        {
                                                                                            acceptedApplications.length ?
                                                                                                <Button
                                                                                                    onClick={() => setApplicants(acceptedApplications)}
                                                                                                    className="application-accept-button">
                                                                                                    Accepted
                                                                                                    ({acceptedApplications.length})
                                                                                                </Button> : ""
                                                                                        }
                                                                                        {
                                                                                            rejectedApplications.length ?
                                                                                                <Button
                                                                                                    onClick={() => setApplicants(rejectedApplications)}
                                                                                                    className="application-reject-button">
                                                                                                    Rejected
                                                                                                    ({rejectedApplications.length})
                                                                                                </Button> : ""
                                                                                        }
                                                                                    </ButtonGroup>
                                                                                </div>

                                                                                {applicants ? applicants.map((applicant: IApplicant, index: number) => (
                                                                                    <div key={index}>
                                                                                        <ListItem
                                                                                            onClick={
                                                                                                () => handleViewApplicant(
                                                                                                    applicant.profileId,
                                                                                                    applicant.id,
                                                                                                    applicant.status ?? 'pending',
                                                                                                    job?.title
                                                                                                )
                                                                                            }
                                                                                            button
                                                                                            alignItems="flex-start">
                                                                                            <ListItemText
                                                                                                primary={
                                                                                                    applicant.name
                                                                                                }
                                                                                                secondary={
                                                                                                    <span
                                                                                                        className="Drawer-timeago">
                                                                                                    {applicant.date}
                                                                                                </span>
                                                                                                }/>
                                                                                            <ListItemSecondaryAction>
                                                                                                {
                                                                                                    applicant.status === 'accepted' ?
                                                                                                        <CheckCircleIcon
                                                                                                            className="application-accept-icon"/> :
                                                                                                        applicant.status === 'rejected' ?
                                                                                                            <CancelIcon
                                                                                                                className="application-reject-icon"/> :
                                                                                                            <HourglassFullIcon/>
                                                                                                }
                                                                                            </ListItemSecondaryAction>

                                                                                        </ListItem>
                                                                                        <Divider/>
                                                                                    </div>
                                                                                )) : ""}
                                                                            </List>
                                                                        </> :
                                                                        <PleaseWait label={"Loading applicants..."}/>
                                                                }
                                                            </div>
                                                        </XDrawer>
                                                    </>

                                                }
                                            </Grid>
                                        </Grid>
                                    </CardContent>

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