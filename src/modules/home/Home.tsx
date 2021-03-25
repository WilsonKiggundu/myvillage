import React, {useEffect} from "react";
import Container from "@material-ui/core/Container";
import {Urls} from "../../routes/Urls";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import userManager from "../../utils/userManager";
import {useHistory} from "react-router-dom";
import AfricaMap from "../../assets/images/map-of-africa.png"
import {ReactComponent as MyVillageLogo} from "../../assets/images/mv-colored-logo.svg";

import './Home.css'


function Home() {

    const history = useHistory()
    const {user} = useSelector((state: any) => state.oidc)

    const isAuthenticated = user != null

    if (isAuthenticated) {
        history.push(Urls.feed)
    }

    const handleSignup = () => {
        window.location.replace(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${process.env.REACT_APP_SIGNUP_REDIRECT_URL}`)
    }

    const handleSignin = () => {
        return userManager.signinRedirect()
    }

    useEffect(() => {
        document.title = "My Village / Africa's Entrepreneurs meet here."
        document.body.style.backgroundColor = '#1C1C1C'
    })

    return (
        <div className="body">
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                        <Grid spacing={2} container>
                            <Grid item xs={12} sm={8} lg={6}>
                                <MyVillageLogo className="Home-logo"/>

                                <div className="title">
                                    Africa's Entrepreneurs meet here.
                                </div>

                                <div className="subtitle">
                                    Grow your network. Expand your thinking. Exchange ideas. Be inspired
                                </div>

                                <Grid container spacing={3} justify='flex-start'>
                                    <Grid item xs={12} md={6}>
                                        <button
                                            className="signin-button"
                                            onClick={handleSignin}>
                                            Sign in
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <button
                                            className="signup-button"
                                            onClick={handleSignup}>
                                            Create an account
                                        </button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="map-holder" item xs={12} sm={4} lg={6}>
                                <img src={AfricaMap} alt="africa"/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home