import React from "react";
import Container from "@material-ui/core/Container";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from "@material-ui/icons/Work";
import AuthService from "../../services/AuthService";
import palette from "../../theme/palette";
import {RedirectToUrl} from "../../routes/RedirectToUrl";
import {Urls} from "../../routes/Urls";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {Wrapper} from "@material-ui/pickers/wrappers/Wrapper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Stats} from "../../components/Stats";
import {PeopleOutline} from "@material-ui/icons";
import { homeStyles} from "../../theme/styles";
import Box from "@material-ui/core/Box";
import Logo from "../../assets/images/full-logo.png"

interface IStat {
    title: string
    details: string
    icon: any
}

function Home() {

    const classes = homeStyles();
    const authService = new AuthService();

    if (authService.isAuthenticated()){
        RedirectToUrl(Urls.feed)
    }

    const stats: IStat[] = [
        {
            title: "50+",
            details: "Investors",
            icon: "MonetizationOnIcon"
        },
        {
            title: "845",
            details: "Startups",
            icon: "BusinessIcon"
        },
        {
            title: "1M",
            details: "Active members",
            icon: "PeopleOutline"
        },
        {
            title: "20+",
            details: "Job opportunities",
            icon: "WorkIcon"
        }
    ]

    return (
        <div className={classes.root}>

            <Container maxWidth={"md"}>
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <img className={classes.logo} src={Logo} />

                        <Typography className={classes.headline} variant={"body2"}>
                            Grow your network. Expand your thinking. Exchange ideas. Be inspired
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box mb={2}>
                            <Button variant="outlined"
                                    size={"large"}
                                    onClick={authService.signupRedirect}
                                    className={classes.button}
                                    color="primary">
                                Join the community
                            </Button>
                        </Box>
                        <Box mb={2}>
                            <Button variant="contained"
                                    size={"large"}
                                    onClick={authService.signinRedirect}
                                    className={classes.button}
                                    color="primary">
                                Sign in
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>


        </div>
    )
}

export default Home