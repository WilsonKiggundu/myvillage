import React from "react";
import {globalStyles} from "../../../theme/styles"
import {Container, createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Awards, PersonProfiles, Interests} from "../../../data/mockData";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import palette from "../../../theme/palette";
import Button from "@material-ui/core/Button";
import AwardsTimeline from "../../../components/AwardsTimeline";
import ContactCard from "../../../components/ContactCard";
import Box from "@material-ui/core/Box";
import ProfileRating from "../../../components/ProfileRating";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

                                    <ProfileRating rating={3} />

                                    <Divider />

                                    <Typography style={{margin: '15px 0'}}>
                                        <strong>Incorporation Date</strong> <br/>
                                        <span>Aug. 21, 2007</span>
                                    </Typography>

                                    <Divider />

                                    <Typography style={{margin: '15px 0'}}>
                                        <strong>Address</strong> <br/>
                                        <span>Ntinda Complex <br /> Block B&C - 3rd Floor</span>
                                    </Typography>

                                    <Divider />

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
                            <Card variant="outlined" className={classes.bottomMargin}>

                                <CardHeader
                                    avatar={
                                        <Avatar src={avatar} aria-label="recipe" className={styles.avatar} />
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title="The Innovation Village Kampala"
                                    subheader="Gulu . Jinja . Mbarara . Mbale . Ntinda"
                                />

                                <img style={{width: '100%'}} src={coverPhoto} alt=""/>

                                <CardContent>
                                    <Box>
                                        <Typography variant="body2">
                                            Quisque eu eleifend sapien. Sed et eros non nibh eleifend tempus. Sed rhoncus
                                            mauris in tellus viverra, in molestie turpis feugiat. Fusce massa massa,
                                            convallis ut elit ac, dictum porta odio. Aenean viverra neque id turpis maximus
                                            cursus. Etiam vitae mi eros. Duis vestibulum orci ex, in vulputate leo iaculis
                                            eget. Suspendisse suscipit tortor sit amet neque.
                                        </Typography>
                                    </Box>

                                    <Box mt={2}>
                                        <Button className={clsx(classes.noShadow)}
                                                color="primary"
                                                size="small"
                                                variant="outlined">
                                            Follow
                                        </Button>
                                        <Button className={clsx(classes.noShadow)}
                                                style={{marginLeft: 10}}
                                                color="secondary"
                                                size="small"
                                                variant="outlined">
                                            Send message
                                        </Button>
                                    </Box>

                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>

                                <CardHeader
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    subheader="Stuff we are interested in"
                                />

                                <CardContent>
                                    <div className={styles.root}>
                                        {interests ? interests.map(i =>
                                            <Chip
                                                label={i.category}
                                                key={i.id}
                                                //deleteIcon={<CloseIcon/>}
                                                //onDelete={() => handleRemoveInterest(i.id)}
                                                clickable
                                                color="secondary"
                                                variant="default"/>) : ""}
                                    </div>

                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        subheader="Our work"
                                    />

                                    <Grid container spacing={2}>
                                        {products ? products.map((p, index) => (
                                            <Grid key={index} item xs={6} sm={3} md={4}>
                                                <img style={{width: '100%', height:'auto'}} src={p} alt={p}/>
                                            </Grid>
                                        )) : ""}
                                    </Grid>

                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        subheader="Awards"
                                    />
                                    <AwardsTimeline awards={awards} />
                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        subheader="Our people"
                                    />
                                    {contacts ?
                                        <Grid container spacing={2}>
                                            {
                                                contacts.map(contact => (
                                                    <Grid key={contact.id} item xs={12} sm={6} md={4}>
                                                        <ContactCard {...contact}/>
                                                    </Grid>
                                                ))

                                            }
                                            <Grid item xs={12} sm={2} md={4}>

                                            </Grid>
                                        </Grid> : ""
                                    }
                                </CardContent>
                            </Card>

                        </Grid>
                    </Box>
                </Grid>
            </Container>
        </div>
    )
}

export default Startup