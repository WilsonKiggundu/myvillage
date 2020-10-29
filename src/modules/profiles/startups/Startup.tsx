import React from "react";
import {globalStyles} from "../../../theme/styles"
import {Container, createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Awards, Interests, PersonProfiles, Startups} from "../../../data/mockData";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import palette from "../../../theme/palette";
import Button from "@material-ui/core/Button";
import AwardsTimeline from "../../../components/AwardsTimeline";
import ContactCard from "../../../components/ContactCard";
import Box from "@material-ui/core/Box";
import ProfileRating from "../../../components/ProfileRating";
import StartAPostCard from "../../../components/StartAPostCard";
import {StartupBioCard} from "./StartupBioCard";
import InterestsCard from "../../../components/InterestsCard";
import Gallery from "../../../components/Gallery";
import {PeopleCard} from "./PeopleCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        nav: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },

        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        smallAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        largeAvatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        avatar: {
            backgroundColor: palette.primary.main
        }
    }),
);

const Startup = ({match}: any) => {
    const classes = globalStyles()
    const styles = useStyles();

    const interests = Interests;
    const contacts = PersonProfiles;
    const awards = Awards;

    const avatar = "https://innovationvillage.co.ug/wp-content/uploads/2020/07/new-logo-white-02-1.png";
    const coverPhoto = "https://picsum.photos/1920/1080?image=20"
    const placeHolder = "https://picsum.photos/500/500"
    let products = []

    const profile = Startups[0];

    for (let i = 0; i < 9; i++) {

        products.push(`${placeHolder}?image=${i * 5 + 10}`)
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid spacing={2} container justify="flex-start">
                    <Box clone order={{xs: 2, sm: 1}}>
                        <Grid item xs={12} md={4} lg={3} sm={12}>
                            <Card style={{textAlign: 'center'}} variant="outlined">
                                <CardContent>
                                    <div className={classes.profilePhoto}>
                                        <Avatar className={clsx(styles.largeAvatar, styles.avatar)}
                                                style={{}}
                                                variant="circle"
                                                src={avatar}/>
                                    </div>

                                    <Typography variant="h6">The Innovation Village Kampala</Typography>
                                    <Typography paragraph>Gulu . Jinja . Mbarara . Mbale . Ntinda</Typography>

                                    <ProfileRating rating={3}/>

                                    <Divider/>

                                    <Typography style={{margin: '15px 0'}}>
                                        <strong>Incorporation Date</strong> <br/>
                                        <span>Aug. 21, 2007</span>
                                    </Typography>

                                    <Divider/>

                                    <Typography style={{margin: '15px 0'}}>
                                        <strong>Address</strong> <br/>
                                        <span>Ntinda Complex <br/> Block B&C - 3rd Floor</span>
                                    </Typography>

                                    <Divider/>

                                    <Button variant="outlined"
                                            target="_blank"
                                            color="primary"
                                            href="https://www.innovationvillage.co.ug" style={{marginTop: 15}}>
                                        <strong>Visit Website</strong>
                                    </Button>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Box>
                    <Box clone order={{xs: 1, sm: 2}}>
                        <Grid item xs={12} sm={12} md={8} lg={9}>
                            <StartAPostCard placeholder={`Post on ${profile.name}'s wall...`}/>
                            <StartupBioCard profile={profile}/>
                            <InterestsCard items={interests}/>
                            <Gallery items={products} title={"Our products"}/>
                            <AwardsTimeline awards={awards}/>
                            <PeopleCard title={"Our people"} items={contacts.slice(0, 8)}/>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </div>
    )
}

export default Startup