import React from "react";
import Container from "@material-ui/core/Container";
import {RedirectToUrl} from "../../routes/RedirectToUrl";
import {Urls} from "../../routes/Urls";
import {useTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {homeStyles} from "../../theme/styles";
import Box from "@material-ui/core/Box";
// import {ReactComponent as Logo} from "../../assets/images/myvillage-logo.svg"
import Logo from "../../assets/images/myvillage-logo.png"
import BulbsBg from "../../assets/images/bulbs-bg.png"
import HandBg from "../../assets/images/hand-bg.png"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useSelector} from "react-redux";
import userManager from "../../utils/userManager";

interface IStat {
    title: string
    details: string
    icon: any
}

function Home() {

    const classes = homeStyles();
    const {user} = useSelector((state: any) => state.oidc)

    const isAuthenticated = user != null

    if (isAuthenticated) {
        window.location.replace(Urls.feed)
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSignup = () => {
        window.location.replace(`${process.env.REACT_APP_AUTH_URL}/account/signup?returnUrl=${process.env.REACT_APP_SIGNUP_REDIRECT_URL}`)
    }

    return (
        <div className={classes.root}>
            <Grid className={classes.main} container>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                        <Grid className={classes.container} container>
                            <Grid item xs={12} md={8}>
                                {/*<Logo className={classes.logo}/>*/}
                                <img alt={"logo"} src={Logo} className={classes.logo}/>

                                <Typography className={classes.headline} variant={"body2"}>
                                    Grow your network. Expand your thinking. <br/>Exchange ideas. Be inspired
                                </Typography>

                                <Typography className={classes.subHeadline} component={"div"}>
                                    Startups | Community | Opportunities | Events
                                </Typography>

                            </Grid>
                            <Grid className={classes.buttons} item xs={12} sm={6} md={4}>
                                <Box mb={2}>
                                    <Button variant="contained"
                                            size={"large"}
                                            onClick={handleSignup}
                                            className={classes.button}
                                            color="primary">
                                        Join the community
                                    </Button>
                                </Box>
                                <Box mb={2}>
                                    <Button variant="outlined"
                                            size={"large"}
                                            onClick={() => userManager.signinRedirect()}
                                            className={classes.button}
                                            color="primary">
                                        Sign in
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>

            <Grid className={classes.footer} container>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                        <Grid item xs={12} md={8}>
                            <Typography className={classes.title}>
                                <strong>Africa's Entrepreneurs meet here.</strong>
                            </Typography>
                            <Typography className={classes.subtitle}>
                                We are building a vibrant community.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {!isMobile ? (
                                <>
                                    <img style={{position: "absolute", maxHeight: 600, width: 'auto', top: 0, left: 0}}
                                         className={classes.img}
                                         alt={"bulbs-bg"}
                                         src={BulbsBg}/>
                                    <img className={classes.img}
                                         alt={"hand-bg"}
                                         style={{
                                             position: "absolute",
                                             maxHeight: 450,
                                             width: 'auto',
                                             bottom: -20,
                                             right: 0
                                         }}
                                         src={HandBg}/>
                                </>
                            ) : ""}
                        </Grid>
                    </Container>
                </Grid>
            </Grid>

        </div>
    )
}

export default Home