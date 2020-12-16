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
import {homeStyles} from "../../theme/styles";
import Box from "@material-ui/core/Box";
import {ReactComponent as Logo} from "../../assets/images/logo-white.svg"
import BulbsBg from "../../assets/images/bulbs-bg.png"
import HandBg from "../../assets/images/hand-bg.png"

interface IStat {
    title: string
    details: string
    icon: any
}

function Home() {

    const classes = homeStyles();
    const authService = new AuthService();

    if (authService.isAuthenticated()) {
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
            <Grid className={classes.main} container>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                        <Grid className={classes.container} container>
                            <Grid item xs={12} md={8}>
                                <Logo className={classes.logo}/>

                                <Typography className={classes.headline} variant={"body2"}>
                                    Grow your network. Expand your thinking. <br/>Exchange ideas. Be inspired
                                </Typography>

                                <Typography className={classes.subHeadline} component={"div"}>
                                    Investors | Startups | Members | Job Opportunities
                                </Typography>

                            </Grid>
                            <Grid className={classes.buttons} item xs={12} md={4}>
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
                </Grid>
            </Grid>

            <Grid className={classes.footer} container>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                        <Grid item xs={12} md={8}>
                            <Typography style={{textTransform: "uppercase"}} className={classes.title}>
                                Don't be left out again
                            </Typography>
                            <Typography className={classes.subtitle}>
                                We are building a vibrant community. A lot is always happening from developer
                                meetups to founder labs.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img style={{position: "absolute", maxHeight: 600, width: 'auto', top: 0, left: 0}}
                                 src={BulbsBg}/>
                            <img style={{position: "absolute", maxHeight: 600, width: 'auto', bottom: 0, right: 0}}
                                 src={HandBg}/>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>

        </div>
    )
}

export default Home