import {Box, Button, Card, CardContent, Container, Grid} from "@material-ui/core";
import React from "react";
import Image from '../../assets/images/find-a-job.jpeg'

import './css/JobsHome.css'
import XImageLoader from "../../components/XImageLoader";
import {ChevronRight} from "@material-ui/icons";
import {Urls} from "../../routes/Urls";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";

const JobsHome = () => {

    const user = useSelector(userSelector)

    const handleSignup = () => {
        window.location.replace(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${process.env.REACT_APP_SIGNUP_REDIRECT_URL}`)
    }

    return (
        <Box mb={2} mt={2}>
            <Container maxWidth={"lg"}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={5}>
                        <h3 className="JobsHome-title">Find your dream job anywhere in Africa with your profile</h3>
                        <p className="JobsHome-tagline">
                            Entrepreneurs are looking for you to help them build and scale their startups.
                        </p>
                        <div className="JobsHome-apply">
                            <Button
                                href={Urls.jobs.list}
                                size={"large"}
                                color={"secondary"}
                                variant={"contained"}
                                disableElevation>
                                Find a job <ChevronRight />
                            </Button>
                        </div>

                        {!user && <div className="JobsHome-signup">
                            <a onClick={handleSignup} href="#">Create your profile</a>
                        </div>}

                    </Grid>
                    <Grid item xs={12} lg={7}>
                        <XImageLoader width={"100%"} effect={"opacity"} src={Image}/>
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div className="JobsHome-how-it-works">How it works</div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Card elevation={0}>
                            <CardContent>
                                <div className="JobsHome-step-num">
                                    1
                                </div>
                                <div className="JobsHome-step-details">
                                    Sign up
                                </div>
                                <div>Create your account with your email address and get a MyVillage ID</div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Card elevation={0}>
                            <CardContent>
                                <div className="JobsHome-step-num">
                                    2
                                </div>
                                <div className="JobsHome-step-details">
                                    Update your profile
                                </div>
                                <div>
                                    Say something about you, where you went to school, what you studied, key skills you possess.
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Card elevation={0}>
                            <CardContent>
                                <div className="JobsHome-step-num">
                                    3
                                </div>
                                <div className="JobsHome-step-details">
                                    Apply for your dream job
                                </div>
                                <div>Once you have found your dream job, just click the apply button.</div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    )
}

export default JobsHome