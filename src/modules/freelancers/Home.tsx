import {Button, Container, Grid, Snackbar, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useState} from "react";
import XImageLoader from "../../components/XImageLoader";
import Image from '../../assets/images/freelancers.png'

import './css/Freelancers.css'
import {ChevronRight, Work} from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import WorkIcon from '@material-ui/icons/Work';

import {ReactComponent as Freelancers} from "../../assets/images/freelancers_two.svg";
import {Alert} from "@material-ui/lab";
import {handleLogin} from "../../utils/authHelpers";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {XLoginSnackbar} from "../../components/XLoginSnackbar";
import { useHistory } from "react-router-dom";
import {Urls} from "../../routes/Urls";

const FreelancerHome = () => {

    const theme = useTheme()
    const history = useHistory()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const user = useSelector(userSelector)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const handlePostJob = () => {
        if (user){
            history.push(Urls.jobs.create)
        }else{
            setOpenSnackbar(true)
        }
    }

    const handleEarnAsAFreelancer = () => {
        if (user){

        }else{
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
                                Do you want anything done?
                            </div>

                            <div className="Freelancers-main-title">
                                Choose from our network of Freelancers.
                            </div>

                            <div className="Freelancers-leading-text">
                                They will get the job done, the way you want it done.
                            </div>

                            <Grid container justify={"center"} spacing={2} className="Freelancers-buttons">
                                <Grid item>
                                    <Button
                                        href={Urls.profiles.searchFreelancers}
                                        className="Freelancers-button"
                                        variant={"contained"}
                                        size={"large"}
                                        disableElevation color={"primary"}>
                                        Hire a Freelancer <ChevronRight/>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={handleEarnAsAFreelancer}
                                        className="Freelancers-button2"
                                        variant={"outlined"}
                                        size={"large"}
                                        disableElevation color={"secondary"}>
                                        Earn as a Freelancer
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <XImageLoader width={"100%"} effect={"opacity"} src={Image}/>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div>
                <Container maxWidth={"lg"}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <div className="Process-title">What is the process?</div>
                        </Grid>
                        {!isMobile && <Grid item lg={6}>
                            <Freelancers style={{marginTop: -150}} width={'100%'} />
                        </Grid>}
                        <Grid item lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <WorkIcon className="Process-card-icon" />
                                        <h3>Post</h3>
                                        <p>It starts with you posting the job that you want to get done.</p>
                                        <Button onClick={handlePostJob} color={"secondary"} variant={"outlined"}>Post a job</Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <VisibilityIcon className="Process-card-icon" />
                                        <h3>Choose</h3>
                                        <p>Browser the network of freelancers and invite them to the job</p>
                                        <Button color={"default"} variant={"outlined"}>Choose a freelancer</Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <AttachMoneyIcon className="Process-card-icon" />
                                        <h3>Hire</h3>
                                        <p>You can use whichever criteria to choose the best match for you.</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <StarIcon className="Process-card-icon" />
                                        <h3>Rate</h3>
                                        <p>Give them a thumbs-up for the good job done.</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/*<div className="Freelancers-bg-purple">*/}
            {/*    <Container maxWidth={"lg"}>*/}
            {/*        <Grid container spacing={8}>*/}
            {/*            <Grid item xs={12}>*/}
            {/*                <div className="Process-title">What's unique about it?</div>*/}
            {/*            </Grid>*/}
            {/*            <Grid item xs={12} md={4}>*/}
            {/*                <div className="Process-card">*/}
            {/*                    <StarIcon className="Process-card-icon" />*/}
            {/*                    <h3>Rate</h3>*/}
            {/*                    <p>Give them a thumbs-up for the good job done.</p>*/}
            {/*                </div>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Container>*/}
            {/*</div>*/}

            {!user && <XLoginSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} />}
        </Container>
    )
}

export default FreelancerHome