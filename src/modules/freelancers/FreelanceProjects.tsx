import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Container,
    Snackbar,
    useMediaQuery,
    useTheme,
    withStyles
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import {longDate, timeAgo} from "../../utils/dateHelpers";
import {grey} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {freelanceProjectsSelector} from "./redux/freelanceProjectSelectors";
import {getFreelanceProjects} from "./redux/freelanceProjectActions";
import {PleaseWait} from "../../components/PleaseWait";
import ErrorPage from "../exceptions/Error";
import {Add} from "@material-ui/icons";
import XDialog from "../../components/dialogs/XDialog";
import CreateProject from "./forms/CreateProject";
import {XFab} from "../../components/buttons/XFab";
import {getPeople} from "../profiles/people/redux/peopleEndpoints";
import {userSelector} from "../../data/coreSelectors";
import {IPerson, isLancer} from "../profiles/people/IPerson";
import Toast from "../../utils/Toast";
import Button from "@material-ui/core/Button";
import {Alert, AlertProps} from "@material-ui/lab";
import {Urls} from "../../routes/Urls";
import {getAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IFreelanceProject} from "./IFreelanceProject";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {handleLogin, handleSignup} from "../../utils/authHelpers";

const Accordion = withStyles({
    root: {
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const FreelanceProjects = () => {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = React.useState<string | false>('panel0');
    const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
    const [openUpdateCategoryDialog, setUpdateCategoryDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingLabel, setLoadingLabel] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertProps, setAlertProps] = useState<AlertProps>()
    const user = useSelector(userSelector)

    const projects = useSelector(freelanceProjectsSelector)

    useEffect(() => {
        document.title = "Freelancers / Projects / My Village"
        dispatch(getFreelanceProjects())
    }, [dispatch])

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    }

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    if (projects.isLoading) return <PleaseWait label={"Loading projects..."}/>
    if (projects.error) return <ErrorPage title={"Loading jobs failed"} message={projects.error}/>

    const getRequestStatus = (status: number) => {
        switch (status) {
            case 1:
                return 'Expressed Interest'
            case 2:
                return 'Rejected'
            case 3:
                return 'Considered'
            case 4:
                return 'Hired'
            default:
                return 'Expressed Interest'
        }
    }

    const handleHireMe = async (project: IFreelanceProject) => {

        if (!user){
            setAlertProps({
                severity: "error",
                icon: false,
                children: <>
                    <h5>Request denied</h5>
                    <p>You need to login to apply. If you don't already have a profile, you can sign up.</p>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button onClick={handleLogin}
                                    size={"small"}
                                    disableElevation
                                    variant={"contained"}
                                    color={"primary"}>
                                Continue to login
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleSignup}
                                    size={"small"}
                                    disableElevation
                                    variant={"outlined"}
                                    color={"secondary"}>
                                Create profile
                            </Button>
                        </Grid>
                    </Grid>
                </>
            })
            setShowAlert(true)
        }else{
            setLoading(true)
            setLoadingLabel('Processing your request...')

            try {
                // check if the person is a freelancer
                const response: any = await getPeople({id: user.profile.sub})
                const person: IPerson = response.body.persons[0]

                setLoadingLabel('Checking if you are a freelancer...')
                const isFreelancer = isLancer(person)

                // If not, ask them to update their profile
                if (!isFreelancer) {
                    setLoading(false)
                    setAlertProps({
                        severity: "error",
                        icon: false,
                        children: <>
                            <h5>Update your profile</h5>
                            <p>You need to set your category to Freelancer.</p>
                            <Button
                                size={"small"}
                                variant={"outlined"}
                                href={Urls.profiles.onePerson(person.id)}>
                                Update Profile
                            </Button>
                        </>
                    })
                    setShowAlert(true)
                }

                // if yes, check if they already expressed interest in the project
                else {
                    const url = makeUrl("Profiles", Endpoints.freelanceProjects.people)
                    const response: any = await getAsync(url, {projectId: project.id})

                    const request = response
                        .body
                        .find((p: any) => p.personId === user.profile.sub && p.projectId === project.id)

                    // if yes, tell them what the status of their request is
                    if (request) {
                        setLoading(false)
                        setAlertProps({
                            severity: "info",
                            icon: false,
                            children: <>
                                <h5>Request status</h5>
                                <p>You made a request on <strong>{longDate(request.dateCreated)}</strong></p>
                                <div><Chip variant={"outlined"} label={getRequestStatus(request.status)} /></div>
                            </>
                        })
                        setShowAlert(true)

                    } else {
                        // if no, send an email to the project owner
                        await postAsync(url, {
                            projectId: project.id,
                            personId: user.profile.sub,
                            status: 1
                        })

                        setLoading(false)
                        setAlertProps({
                            severity: "success",
                            icon: <DoneAllIcon/>,
                            children: <>
                                <h5>Request successful</h5>
                                <p>Your request to be hired for the project has been sent.</p>
                            </>
                        })
                        setShowAlert(true)

                    }
                }
            } catch (e) {
                Toast.error("Unable to process your request")
                console.log(e)
            }
        }


    }

    return (
        <Container maxWidth={"md"}>

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={showAlert} autoHideDuration={6000}
                onClose={() => setShowAlert(false)}>
                <Alert {...alertProps} />
            </Snackbar>

            <Box mb={2}>
                <Card>
                    <CardHeader title={"Freelance Projects"}/>
                </Card>
            </Box>

            <Box mb={2}>
                <Card>

                    {projects.data.length ?
                        projects.data.map((project: any, index: number) => (
                            <Accordion
                                key={index}
                                square
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}>
                                <AccordionSummary
                                    aria-controls={`panel${index}d-content`}
                                    id={`panel${index}d-header`}>
                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <h6>{project.name}</h6>
                                            <span style={{color: grey[600], fontSize: 12, marginTop: -10}}>
                                                Posted {timeAgo(project.dateCreated)}
                                            </span>
                                        </Grid>

                                        <Grid style={{textAlign: 'right'}} item xs={12} md={6}>
                                            {
                                                project.status === 1 ? <Chip label={"Open"}/> :
                                                    project.status === 2 ? <Chip color={"primary"} label={"Taken"}/> :
                                                        <Chip label={"On hold"}/>
                                            }
                                        </Grid>
                                    </Grid>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div dangerouslySetInnerHTML={{__html: project.description}}/>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div><strong>Required skills</strong></div>
                                            <div>{project.skills}</div>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box mt={2} mb={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Card>
                                                            <CardContent>
                                                                <strong>Budget</strong><br/>
                                                                <span>{project.budget}</span>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Card>
                                                            <CardContent>
                                                                <strong>Payment Options</strong><br/>
                                                                <span>{project.paymentOption}</span>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            {loading ?
                                                <>
                                                    <PleaseWait label={loadingLabel}/>
                                                </> :
                                                <Button
                                                    onClick={() => handleHireMe(project)}
                                                    variant={"contained"}
                                                    disabled={loading || project.status !== 1}
                                                    color={"secondary"}
                                                    disableElevation>
                                                    Hire me
                                                </Button>
                                            }
                                        </Grid>

                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )) : <CardContent>
                            No projects found
                        </CardContent>
                    }
                </Card>

                <XFab
                    onClick={() => setOpenAddProjectDialog(true)}
                    right={15}
                    variant={isMobile ? "round" : "extended"}
                    bottom={15}
                    color={"primary"}
                    position={"fixed"}>
                    <Add/> {!isMobile && <span>Post your Project</span>}
                </XFab>

                <XDialog title={"What's your job?"}
                         maxWidth={"md"}
                         onClose={() => setOpenAddProjectDialog(false)}
                         open={openAddProjectDialog}>
                    <CreateProject
                        onClose={() => setOpenAddProjectDialog(false)}/>
                </XDialog>

            </Box>
        </Container>
    )
}

export default FreelanceProjects