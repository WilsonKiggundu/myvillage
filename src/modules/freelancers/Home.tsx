import {Button, Container, Grid} from "@material-ui/core";
import React from "react";
import XImageLoader from "../../components/XImageLoader";
import Image from '../../assets/images/freelancers.png'

import './css/Freelancers.css'
import {ChevronRight, Work} from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import WorkIcon from '@material-ui/icons/Work';

import {ReactComponent as Freelancers} from "../../assets/images/freelancers_two.svg";

const FreelancerHome = () => {
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

                            <Grid container justify={"flex-start"} spacing={2} className="Freelancers-buttons">
                                <Grid item>
                                    <Button
                                        className="Freelancers-button"
                                        variant={"contained"}
                                        size={"large"}
                                        disableElevation color={"primary"}>
                                        Hire a Freelancer <ChevronRight/>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
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
                        <Grid item lg={6}>
                            <Freelancers style={{marginTop: -150}} width={'100%'} />
                        </Grid>
                        <Grid item lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <WorkIcon className="Process-card-icon" />
                                        <h3>Post</h3>
                                        <p>It starts with you posting the job that you want to get done.</p>
                                        <Button color={"secondary"} variant={"outlined"}>Post a job</Button>
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
                                        <div>

                                        </div>

                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Container>
    )
}

export default FreelancerHome