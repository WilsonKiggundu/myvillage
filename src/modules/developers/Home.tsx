import {Button, Container, Grid, Snackbar, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useState} from "react";
import XImageLoader from "../../components/XImageLoader";
import Image from '../../assets/images/freelancers.png'

import './css/Developers.css'
import {ChevronRight, Work} from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import WorkIcon from '@material-ui/icons/Work';

import {ReactComponent as Developers} from "../../assets/images/freelancers_two.svg";
import {Alert} from "@material-ui/lab";
import {handleLogin, handleSignup} from "../../utils/authHelpers";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";
import {XLoginSnackbar} from "../../components/XLoginSnackbar";
import { useHistory } from "react-router-dom";
import {Urls} from "../../routes/Urls";

const DeveloperHome = () => {

    const theme = useTheme()
    const history = useHistory()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const user = useSelector(userSelector)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const handleCreateProfile = () => {
        if (user){
            history.push(Urls.profiles.onePerson(user.profile.sub))
        }else{
            handleSignup()
        }
    }

    const handleEarnAsADeveloper = () => {
        if (user){

        }else{
            setOpenSnackbar(true)
        }
    }

    return (
        <Container maxWidth={false} disableGutters>
            <div className="Developers-bg-white">
                <Container maxWidth={"lg"}>
                    <Grid spacing={2} justify={"center"} container>
                        <Grid item xs={12} lg={5}>

                            <div className="Developers-title">
                                Are you a software developer?
                            </div>
                            <div className="Developers-main-title">
                                Let the world know what you can do.
                            </div>

                            <div className="Developers-buttons">
                                <Grid container justify={"flex-start"} spacing={2}>
                                    <Grid item>
                                        <Button
                                            onClick={handleCreateProfile}
                                            className="Developers-button"
                                            variant={"contained"}
                                            size={"large"}
                                            disableElevation color={"secondary"}>
                                            Create your profile <ChevronRight/>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            href={Urls.profiles.searchDevelopers}
                                            className="Developers-button2"
                                            variant={"outlined"}
                                            size={"large"}
                                            disableElevation color={"default"}>
                                            Find a developer
                                        </Button>
                                    </Grid>
                                </Grid>
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

            <div>
                <Container maxWidth={"lg"}>
                    <Grid container spacing={8}>

                        <Grid item xs={12}>
                            <div></div>
                        </Grid>

                        {!isMobile && <Grid item lg={6}>
                            <Developers style={{marginTop: -150}} width={'100%'} />
                        </Grid>}
                        <Grid item lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <WorkIcon className="Process-card-icon" />
                                        <h3>Update profile</h3>
                                        <p>Add your eduction background, skills, interests</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <VisibilityIcon className="Process-card-icon" />
                                        <h3>Add projects</h3>
                                        <p>Showcase the amazing work you have done.</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <AttachMoneyIcon className="Process-card-icon" />
                                        <h3>Tech Stack</h3>
                                        <p>Employers want to know the technologies you use.</p>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="Process-card">
                                        <StarIcon className="Process-card-icon" />
                                        <h3>Apply for jobs</h3>
                                        <p>There are plenty of job opportunities for you, all the time.</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/*<div className="Developers-bg-purple">*/}
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

export default DeveloperHome