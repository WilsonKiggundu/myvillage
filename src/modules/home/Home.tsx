import React from "react";
import {useStyles} from "./styles";
import {useLayoutStyles} from "../../components/layout/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import StartAStartup from "../../assets/images/start-a-startup.png";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from "@material-ui/icons/Work";
import Grid from "@material-ui/core/Grid";
import {Wrapper} from "../../components/layout/Wrapper";
import AuthService from "../auth/AuthService";
import {Stats} from "../../components/Stats";
import {PeopleOutline} from "@material-ui/icons";
import palette from "../../theme/palette";

interface IStat {
    title: string
    details: string
    icon: any
}

function Home() {

    const globalClasses = useLayoutStyles();
    const classes = useStyles();

    const authService = new AuthService();

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
        <div style={{display: "block"}} className={`${classes.toolbar} ${globalClasses.fullWidth}`}>
            <Wrapper>
                <Grid container>
                    <Grid item lg={3}/>
                    <Grid item lg={6} md={8}>
                        <Typography style={
                            {
                                padding: 15,
                                textAlign: 'center'
                            }}
                            variant="h2"
                            component="h2">
                            Join MyVillage.
                        </Typography>
                        <Typography style={{paddingTop: 15, paddingBottom: 25, textAlign: 'center'}}
                                    variant="h5"
                                    component="h5">
                            Grow your network. Expand your thinking. Exchange ideas. Be inspired.
                        </Typography>
                        <Typography style={{paddingBottom: 15, textAlign: 'center'}}>
                            <Button variant="contained"
                                    size={"large"}
                                    onClick={authService.signinRedirect}
                                    style={{
                                        boxShadow: 'none',
                                        textTransform:'inherit',
                                        fontSize: "1.1em",
                                        fontWeight: "bold",
                                        borderRadius: 25
                                    }}
                                    color="secondary">
                                Join the Community
                            </Button>
                        </Typography>

                    </Grid>
                </Grid>
            </Wrapper>
            <Wrapper padding={"50px 0"} textColor="#3C3C3C" >
                <Container fixed>
                    <Grid spacing={5} container>
                        {stats.map(s => (
                            <Grid item xs={6} sm={4} md={3}>
                                <Stats
                                    padding={25}
                                    bgColor="#FFFFFF"
                                    textColor="#3C3C3C"
                                    title={s.title}
                                    details={s.details}>
                                    {
                                        s.icon === 'MonetizationOnIcon' ? <MonetizationOnIcon style={{fontSize: "3.5rem"}} /> :
                                            s.icon === 'BusinessIcon' ? <BusinessIcon  style={{fontSize: "3.5rem"}} /> :
                                                s.icon === 'PeopleOutline' ? <PeopleOutline  style={{fontSize: "3.5rem"}} /> :
                                                    s.icon === 'WorkIcon' ? <WorkIcon style={{fontSize: "3.5rem"}} />  : ''
                                    }
                                </Stats>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </Wrapper>

            <Wrapper padding={50} textAlign="center" textColor="white" bgColor={palette.secondary.dark}>
                <Grid container>
                    <Grid item sm={2} md={3} />
                    <Grid item sm={8} md={6}>
                        <Typography variant="h3" component="h3">
                            Don't be left out, again!
                        </Typography>

                        <Typography style={{paddingTop: 20, fontSize: 20}} paragraph>
                            We are building a vibrant community. A lot is always happening from developer
                                meetups to founder labs.
                        </Typography>
                            <Button variant="contained"
                                    size={"large"}
                                    onClick={authService.signinRedirect}
                                    style={{
                                        boxShadow: 'none',
                                        marginTop: 20,
                                        textTransform:'inherit',
                                        fontSize: "1.1em",
                                        fontWeight: "bold"
                                    }}
                                    color="primary">
                                Get onboard
                            </Button>
                    </Grid>
                </Grid>
            </Wrapper>

        </div>
    )
}

export default Home