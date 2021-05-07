import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Container,
    useMediaQuery,
    useTheme,
    withStyles
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import {timeAgo} from "../../utils/dateHelpers";
import {grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {freelanceProjectsSelector} from "./redux/freelanceProjectSelectors";
import {getFreelanceProjects} from "./redux/freelanceProjectActions";
import {PleaseWait} from "../../components/PleaseWait";
import ErrorPage from "../exceptions/Error";
import {ChevronRight} from "@material-ui/icons";
import XDialog from "../../components/dialogs/XDialog";
import CreateProject from "./forms/CreateProject";
import {XFab} from "../../components/buttons/XFab";

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

    return (
        <Container maxWidth={"md"}>
            <Box mb={2}>
                <Card>
                    <CardHeader title={"Freelance Projects"}/>

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

                                        <Grid item>
                                            <Button
                                                variant={"contained"}
                                                color={"secondary"}
                                                disableElevation>
                                                Hire me
                                            </Button>
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
                    color={"secondary"}
                    position={"fixed"}>
                    Post your Project <ChevronRight/>
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