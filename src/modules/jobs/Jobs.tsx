import {Box, AccordionDetails, createStyles, makeStyles, Theme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Alert} from "@material-ui/lab";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemLink from "../../components/ListItemLink";
import {differenceInCalendarDays, format, formatDistanceToNow} from "date-fns"
import {useHistory} from "react-router-dom";
import {XFab} from "../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add"
import NewJob from "./forms/NewJob";
import XDialog from "../../components/dialogs/XDialog";
import {IJob} from "../../interfaces/IJob";
import {get, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomAccordion from "../../components/CustomAccordion";
import XSelectDropdown from "../../components/inputs/XSelectDropdown";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectAllPosts} from "../posts/postsSlice";
import {getJobs, selectAllJobs} from "./jobsSlice";
import {PleaseWait} from "../../components/PleaseWait";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            fontWeight: 'bold',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

const Jobs = ({match}: any) => {

    const classes = useStyles()

    const {id} = match.params

    const [openJobDialog, setOpenJobDialog] = useState<boolean>(false)
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const dispatch = useDispatch()
    const jobs = useSelector(selectAllJobs)
    const error = useSelector((state: any) => state.jobs.error)

    const status = useSelector((state: any) => state.jobs.status)

    useEffect(() => {
        if (status === 'idle'){
            dispatch(getJobs())
        }
    }, [status, dispatch])

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    let content;
    switch (status) {
        case 'loading':
            return <PleaseWait />
        case 'succeeded':
            content = (
                <Box clone order={{xs: 2, md: 3}}>
                    <Grid item xs={12}>
                        {jobs ? jobs.map((job: IJob) => (

                            <Accordion key={job.id} expanded={expanded === job.id}
                                       onChange={handleChange(job.id)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>{job.title}</Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {job.location} . {job.category.name}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>

                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Alert color={
                                                differenceInCalendarDays(new Date(job.deadline), new Date()) <= 1 ? "warning" : "info"
                                            } icon={false}>
                                                Application deadline is
                                                on <strong>{format(new Date(job.deadline), "PPPP")}</strong> ({formatDistanceToNow(new Date(job.deadline))} from
                                                now)
                                            </Alert>
                                        </Grid>

                                        <Grid xs={12} item>
                                            <Typography style={{margin: '15px 0 0 0'}} variant={"h6"}>
                                                <strong>What you'll do</strong>
                                            </Typography>
                                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                {job.details}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography style={{margin: '15px 0 0 0'}} variant={"h6"}>
                                                <strong>What you'll bring</strong>
                                            </Typography>
                                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                {job.qualifications}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography style={{margin: '15px 0 0 0'}} variant={"h6"}>
                                                <strong>The experience</strong>
                                            </Typography>
                                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                {job.experience}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography style={{margin: '15px 0 0 0'}} variant={"h6"}>
                                                <strong>How to apply</strong>
                                            </Typography>
                                            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                                {job.howToApply}
                                            </Typography>
                                        </Grid>

                                    </Grid>

                                </AccordionDetails>
                            </Accordion>

                        )) : ""
                        }
                    </Grid>
                </Box>
            )
            break;
        case 'error':
            content = <Grid item xs={12}>
                <Alert
                    title={"We failed to get the jobs..."}
                    color={"error"} icon={false}>
                    {error}
                </Alert>
            </Grid>
            break
        default:
            return <></>
    }

    return (
        <Container maxWidth={"md"}>

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

            <Grid spacing={2} container justify={"flex-start"}>
                {/*<Box mb={2} clone order={{xs: 1, md: 1}}>*/}
                {/*    <Grid container spacing={4}>*/}
                {/*        <Grid item xs={12}>*/}
                {/*            <XSelectDropdown*/}
                {/*                variant={"standard"}*/}
                {/*                placeholder={"Location"}*/}
                {/*                helperText={"Filter by location"}*/}
                {/*                options={[]}/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12}>*/}
                {/*            <XSelectDropdown*/}
                {/*                helperText={"Filter by category"}*/}
                {/*                placeholder={"Category"}*/}
                {/*                options={[]}/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12}>*/}
                {/*            <XSelectDropdown*/}
                {/*                helperText={"Filter by company"}*/}
                {/*                placeholder={"Company"}*/}
                {/*                options={[]}/>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Box>*/}

                {content}

            </Grid>
        </Container>
    )
}

export default Jobs