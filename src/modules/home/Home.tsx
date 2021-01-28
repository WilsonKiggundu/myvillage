import React from "react";
import Container from "@material-ui/core/Container";
import {RedirectToUrl} from "../../routes/RedirectToUrl";
import {Urls} from "../../routes/Urls";
import {useTheme, Chip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {globalStyles, homeStyles} from "../../theme/styles";
import Box from "@material-ui/core/Box";
import Africa from "../../assets/images/africa.png"

import Logo from "../../assets/images/myvillage-logo.png"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useSelector} from "react-redux";
import userManager from "../../utils/userManager";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import {red} from "@material-ui/core/colors";
import {white} from "../../theme/custom-colors";

interface IStat {
    title: string
    details: string
    icon: any
}

function Home() {

    const styles = homeStyles();
    const classes = globalStyles()

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
        <div className={clsx(styles.root, classes.scrollable)}>
            <Grid className={styles.main} container>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                        <Grid className={styles.container} container>
                            <Grid item xs={12} md={8}>
                                <img alt={"logo"} src={Logo} className={styles.logo}/>

                                <Typography className={styles.title}>
                                    <strong>Africa's Entrepreneurs <br/>meet here.</strong>
                                </Typography>

                                <Typography className={styles.headline} variant={"body2"}>
                                    Grow your network. Expand your thinking. Exchange ideas. Be inspired
                                </Typography>

                                <Box mt={6}>

                                    <Grid container spacing={2} justify={"center"}>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="contained"
                                                    size={"large"}
                                                    onClick={handleSignup}
                                                    className={styles.button}
                                                    color="primary">
                                                Join the community
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="outlined"
                                                    size={"large"}
                                                    onClick={() => userManager.signinRedirect()}
                                                    className={styles.button}
                                                    color="primary">
                                                Sign in
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Box>

                            </Grid>
                            <Grid item xs={12} md={4}>

                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>

        </div>
    )
}

export default Home