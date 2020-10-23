import React from "react";
import {Container, createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ProfileRating from "../../../components/ProfileRating";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {globalStyles} from "../../../theme/styles";
import {Interests, PersonProfiles, Posts, Qualifications, Startups} from "../../../data/mockData";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizontal from "@material-ui/icons/MoreHoriz"
import {useHistory} from "react-router-dom"
import {Routes} from "../../../routes/routes";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import EducationTimeline from "../../../components/EducationTimeline";
import PostCard from "../../../components/PostCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(0.3),
            },
        },
    }),
);

const Person = ({match}: any) => {
    const classes = globalStyles()
    const styles = useStyles()
    const history = useHistory();

    const {id} = match.params
    const person  = PersonProfiles.filter(p => p.id === id)[0]
    const coverPhoto = "https://picsum.photos/1920/1080?image=20"
    const interests = Interests;
    const connections = PersonProfiles.filter(p => p.id !== id && p.avatar.length).slice(0, 15)
    const qualifications = Qualifications;
    const startups = Startups

    const posts = Posts


    const handleViewProfile = (id: string) => {
        const url = `${Routes.profiles.people}/${id}`
        history.push(url)
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={2}>
                <Box clone order={{xs: 2, sm: 1}}>
                    <Grid item xs={12} md={4} lg={3} sm={12}>
                        <Box mb={2}>
                            <Card style={{textAlign: 'center'}}>
                                <CardContent>
                                    <div className={classes.profilePhoto}>
                                        <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
                                                style={{}}
                                                variant="circle"
                                                src={person.avatar}/>
                                    </div>

                                    <Typography variant="h6">{person.name}</Typography>
                                    <Typography paragraph>{person.role}</Typography>

                                    <ProfileRating rating={3} />

                                </CardContent>
                            </Card>
                        </Box>

                        {connections ?
                            <Box mb={2}>
                                <Card>
                                    <CardHeader
                                        action={
                                            <IconButton>
                                                <MoreHorizontal />
                                            </IconButton>
                                        }
                                        subheader={<small style={{fontSize: '0.7rem'}}>340+ (23 mutual)</small>}
                                        title={<small style={{fontSize: '1rem'}}>Connections</small>} />

                                    <CardContent>
                                        <Grid spacing={1} container>
                                            {
                                                connections.map(c => (
                                                    <Grid key={c.id} item xs={3}>
                                                        <Avatar className={clsx(classes.mediumAvatar, classes.avatar)}
                                                                variant="rounded"
                                                                style={{cursor: "pointer"}}
                                                                onClick={() => handleViewProfile(c.id)}
                                                                src={c.avatar}/>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box> : ""
                        }

                        {startups ?
                            <Box mb={2}>
                                <Card>
                                    <CardHeader
                                        title={<small style={{fontSize: '1rem'}}>Startup linkages</small>} />

                                    <CardContent>
                                        <Grid spacing={1} container>
                                            {
                                                startups.map(c => (
                                                    <Grid key={c.id} item xs={3}>
                                                        <Avatar className={clsx(classes.mediumAvatar, classes.clickable, classes.avatar)}
                                                                variant="circle"
                                                                onClick={() => handleViewProfile(c.id)}
                                                                src={c.logo}/>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box> : ""
                        }


                    </Grid>
                </Box>
                <Box clone order={{xs: 1, sm: 2}}>
                    <Grid item xs={12} md={8} lg={9} sm={12}>
                        <Box mb={2}>
                            <Card>
                                <Typography style={{minHeight: 200, position: 'relative'}} component={"div"}>
                                    <Avatar style={
                                        {
                                            position: 'absolute',
                                            bottom: 15,
                                            left: 10,
                                            border: 'solid 2px white'
                                        }
                                    } className={clsx(classes.mediumAvatar)} src={person.avatar} />
                                    <img style={{width: '100%'}} src={coverPhoto} alt="" />
                                </Typography>
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
                        </Box>

                        <Box mb={2}>
                            <Typography style={{padding: '15px 0'}}>{person.name}'s interests</Typography>

                            <Card>
                                <CardContent>
                                        {interests ? interests.map(i =>
                                            <Chip
                                                label={i.category}
                                                key={i.id}
                                                style={{marginRight: 5, marginBottom: 5}}
                                                clickable
                                                color="secondary"
                                                variant="default"/>) : ""}
                                </CardContent>
                            </Card>
                        </Box>

                        <Box mb={2}>
                            <Card>
                                <CardContent>
                                    <CardHeader
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title="Education"
                                    />
                                    <EducationTimeline qualifications={qualifications} />
                                </CardContent>
                            </Card>
                        </Box>

                        <Box mb={2}>
                            <Typography style={{padding: '15px 0'}}>{person.name}'s posts</Typography>
                            { posts ? posts.map(p => <PostCard {...person} />) : "" }
                        </Box>

                    </Grid>
                </Box>
            </Grid>
        </Container>
    )
}

export default Person