import React from "react";
import Container from "@material-ui/core/Container";
import {Urls} from "../../routes/Urls";
import {useTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Logo from "../../assets/images/myvillage-logo.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useSelector} from "react-redux";
import userManager from "../../utils/userManager";
import {useHistory} from "react-router-dom";
import {homeStyles} from "./styles";
import AfricaMap from "../../assets/images/map-of-africa.png"

import './Home.css'


function Home() {

    const styles = homeStyles();

    const history = useHistory()
    const {user} = useSelector((state: any) => state.oidc)

    const isAuthenticated = user != null

    if (isAuthenticated) {
        history.push(Urls.feed)
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSignup = () => {
        history.push(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${process.env.REACT_APP_SIGNUP_REDIRECT_URL}`)
    }

    return (
        <Container className="body" maxWidth={false}>
            <Grid container >
                <Grid item xs={12}>
                    <Container maxWidth={"lg"}>
                        <Grid spacing={2} container>
                            <Grid item xs={12} sm={6} md={8} lg={6}>
                                <img className="logo" alt={"logo"} src={Logo}/>

                                <div className="title">
                                    Africa's Entrepreneurs meet here.
                                </div>

                                <div className="subtitle">
                                    Grow your network. Expand your thinking. Exchange ideas. Be inspired
                                </div>

                                <Grid container justify='flex-start' >
                                    <Grid item xs={12} md={4}>
                                        <Button
                                            color={"secondary"}
                                            className="signin-button"
                                            variant={"contained"}
                                            onClick={() => userManager.signinRedirect()}>
                                            Sign in
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button variant="text"
                                                className="signup-button"
                                                onClick={handleSignup}
                                                color="secondary">
                                            Create an account
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="map-holder" item xs={12} sm={6} md={4} lg={6}>
                                <img src={AfricaMap}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home