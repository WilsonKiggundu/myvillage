import {Box, Button, CardContent, Container, Grid, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useState} from "react";
import XImageLoader from "../../components/XImageLoader";
import Image from '../../assets/images/freelancers.png'

import './css/Freelancers.css'
import {ChevronRight} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {XLoginSnackbar} from "../../components/XLoginSnackbar";
import {useHistory} from "react-router-dom";
import {Urls} from "../../routes/Urls";
import XDialog from "../../components/dialogs/XDialog";
import CreateProject from "./forms/CreateProject";

import SearchIcon from '@material-ui/icons/Search';
import UpdateFreelanceTermsForm from "./forms/UpdateFreelanceTerms";

const FreelancerHome = () => {

    const theme = useTheme()
    const history = useHistory()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const user = useSelector(userSelector)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [openAddProjectDialog, setOpenAddProjectDialog] = useState<boolean>(false)
    const [openUpdateTermsDialog, setOpenUpdateTermsDialog] = useState<boolean>(false)

    const handlePostJob = () => {
        if (user) {
            history.push(Urls.jobs.create)
        } else {
            setOpenSnackbar(true)
        }
    }

    const handleEarnAsAFreelancer = () => {
        if (user) {
            window.location.replace(Urls.profiles.onePerson(user.profile.sub))
        } else {
            setOpenSnackbar(true)
        }
    }

    return (
        <Container maxWidth={false} disableGutters>
            <div className="Freelancers-bg-white">
                <Container maxWidth={"lg"}>
                    <Grid spacing={2} justify={"center"} container>
                        <Grid item xs={12} lg={5}>
                            <div className="Freelancers-title">
                                Getting the job done!
                            </div>

                            <div className="Freelancers-main-title">
                                Unlocking Uganda’s best freelancers.
                            </div>

                            <div className="Freelancers-leading-text">

                            </div>

                            <Grid container justify={"flex-start"} spacing={2} className="Freelancers-buttons">
                                <Grid item>
                                    <Button
                                        onClick={() => setOpenAddProjectDialog(true)}
                                        className="Freelancers-button"
                                        variant={"contained"}
                                        size={"large"}
                                        disableElevation color={"primary"}>
                                        Post your Project <ChevronRight/>
                                    </Button>

                                    <XDialog title={"What's your job?"}
                                             maxWidth={"md"}
                                             onClose={() => setOpenAddProjectDialog(false)}
                                             open={openAddProjectDialog}>
                                        <CreateProject
                                            onClose={() => setOpenAddProjectDialog(false)}/>
                                    </XDialog>

                                </Grid>
                                {user && <Grid item>
                                    <Button
                                        onClick={handleEarnAsAFreelancer}
                                        className="Freelancers-button2"
                                        variant={"outlined"}
                                        size={"large"}
                                        disableElevation color={"default"}>
                                        Update your Freelance Profile
                                    </Button>

                                    <XDialog
                                        title={"Update your freelance profile"}
                                        open={openUpdateTermsDialog}
                                        maxWidth={"sm"}
                                        onClose={() => setOpenUpdateTermsDialog(false)}>
                                        <UpdateFreelanceTermsForm onClose={() => setOpenUpdateTermsDialog(false)}/>
                                    </XDialog>

                                </Grid>}
                            </Grid>

                            <div className="Freelancers-leading-text">
                                Are you a freelancer? <a href={Urls.freelancers.projects}>Find a project</a>
                            </div>

                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <XImageLoader width={"100%"} effect={"opacity"} src={Image}/>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container maxWidth={"lg"}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <div className="Process-title">What is the process?</div>
                    </Grid>
                    <Grid item lg={12}>
                        <Box mb={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <div className="Freelancers-process-card">
                                        <h3>Complete your profile</h3>
                                        <p>Select your skills and expertise. Upload a professional profile photo. Go through
                                            the Verification Center checklist
                                        </p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Freelancers-process-card">
                                        <h3>Browse jobs that suit you</h3>
                                        <p>We have jobs available for all skills. Maximize your job opportunities by
                                            optimizing your filters. Save your search and get alerted when relevant jobs are
                                            available.</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Freelancers-process-card">
                                        <h3>Write your best pitch</h3>
                                        <p>Prepare the best pitch possible and take time to get acquainted with the project
                                            and why you are the best person for the job. Writing a new brief for each
                                            project is more effective than using the same one!</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Freelancers-process-card">
                                        <h3>Get your payment</h3>
                                        <p>Be ready with all your work tools for when you get hired. We look forward to
                                            quality work and as you earn on the agreed amount.</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <div className="Freelancers-bg-purple">
                <Container maxWidth={"lg"}>
                    <Grid container justify={"center"} spacing={8}>
                        <Grid item>
                            <a className="Freelancer-find-button"
                               href={Urls.profiles.searchFreelancers}>
                                Find a Freelancer
                            </a>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {!user && <XLoginSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)}/>}
        </Container>
    )
}

export default FreelancerHome