import React from "react";
import {globalStyles} from "../../../theme/styles"
import {Container, createStyles, Theme, ListItemIcon} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import {CalendarToday, Edit, LocationOn} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from "@material-ui/icons/Cancel";
import {Awards, Contacts, Interests} from "../../../data/mockData";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import palette from "../../../theme/palette";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from '@material-ui/icons/Info';
import Button from "@material-ui/core/Button";
import AwardsTimeline from "../../../components/AwardsTimeline";
import ContactCard from "../../../components/ContactCard";
import Box from "@material-ui/core/Box";

interface IProps {
    id: string
    children: any
    interests?: any
}

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

        avatar: {
            backgroundColor: palette.primary.main
        }
    }),
);

const StartupProfile = ({match}: any) => {
    const classes = globalStyles()
    const styles = useStyles();
    const {id} = match.params;

    const interests = Interests;
    const contacts = Contacts;
    const awards = Awards;

    const placeHolder = "https://picsum.photos/500/500"
    let products = []

    for (let i = 0; i < 9; i++) {

        products.push(`${placeHolder}?image=${i * 5 + 10}`)
    }

    const handleRemoveInterest = (id: string) => {

    }

    return (
        <div className={classes.root}>
            <Container fixed>
                <Grid spacing={2} container justify="flex-start">
                    <Box clone order={{xs: 2, sm: 1}}>
                        <Grid item xs={12} md={4} lg={3} sm={12}>
                            <Card style={{textAlign: 'center'}} variant="outlined">
                                <CardContent>
                                    <div className={classes.profilePhoto}>
                                        <Avatar className={clsx(styles.largeAvatar, styles.avatar)}
                                                style={{}}
                                                variant="circle"
                                                src="https://innovationvillage.co.ug/wp-content/uploads/2020/07/new-logo-white-02-1.png"/>
                                    </div>

                                    <Typography variant="h6">The Innovation Village Kampala</Typography>
                                    <Typography paragraph>Gulu . Jinja . Mbarara . Mbale . Ntinda</Typography>

                                    <Divider />

                                    <Typography style={{margin: '15px 0'}}>
                                        <strong>Incorporation Date</strong> <br/>
                                        <span>Aug. 21, 2007</span>
                                    </Typography>

                                    <Divider />

                                    <Typography style={{marginTop: 15}}>
                                        <strong>Address</strong> <br/>
                                        <span>Ntinda Complex <br /> Block B&C - 3rd Floor</span>
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Box>
                    <Box clone order={{xs: 1, sm: 2}}>
                        <Grid item xs={12} sm={12} md={8} lg={9}>
                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <Typography component="h2" variant="h4">
                                        The Innovation Village Kampala
                                    </Typography>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h6">
                                        Gulu . Jinja . Mbarara . Mbale . Ntinda
                                    </Typography>
                                    <Typography paragraph>
                                        Quisque eu eleifend sapien. Sed et eros non nibh eleifend tempus. Sed rhoncus
                                        mauris in tellus viverra, in molestie turpis feugiat. Fusce massa massa,
                                        convallis ut elit ac, dictum porta odio. Aenean viverra neque id turpis maximus
                                        cursus. Etiam vitae mi eros. Duis vestibulum orci ex, in vulputate leo iaculis
                                        eget. Suspendisse suscipit tortor sit amet neque.
                                    </Typography>

                                    <Typography>
                                        <Button className={clsx(classes.noShadow)}
                                                color="primary"
                                                size="small"
                                                variant="outlined">
                                            Follow
                                        </Button>
                                        <Button className={clsx(classes.noShadow)}
                                                style={{marginLeft: 10}}
                                                color="primary"
                                                size="small"
                                                variant="outlined">
                                            Send message
                                        </Button>
                                    </Typography>

                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h6">Stuff we are interested in.</Typography>
                                    <div className={styles.root}>
                                        {interests ? interests.map(i =>
                                            <Chip
                                                label={i.category}
                                                deleteIcon={<CloseIcon/>}
                                                onDelete={() => handleRemoveInterest(i.id)}
                                                clickable
                                                color="secondary"
                                                variant="default"/>) : ""}
                                    </div>

                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h6">Stuff we make.</Typography>

                                    <Grid container spacing={2}>
                                        {products ? products.map(p => (
                                            <Grid item xs={6} sm={3} md={4}>
                                                <img style={{width: '100%', height:'auto'}} src={p}/>
                                            </Grid>
                                        )) : ""}
                                    </Grid>

                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h6">Awards.</Typography>
                                    <AwardsTimeline awards={awards} />
                                </CardContent>
                            </Card>

                            <Card variant="outlined" className={classes.bottomMargin}>
                                <CardContent>
                                    <Typography style={{paddingTop: 15, paddingBottom: 15}}
                                                variant="h6">Get in touch.</Typography>

                                    {contacts ?
                                        <Grid container spacing={2}>
                                            {
                                                contacts.map(contact => (
                                                    <Grid item xs={12} sm={6} md={4}>
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

export default StartupProfile