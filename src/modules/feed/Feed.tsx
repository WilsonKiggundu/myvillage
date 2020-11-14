import React from "react";
import {globalStyles} from "../../theme/styles"
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ProfileRating from "../../components/ProfileRating";
import StartAPostCard from "../../components/StartAPostCard";
import PostCard from "../../components/PostCard";
import {PersonProfiles, Posts} from "../../data/mockData";


const Feed = ({match}: any) => {
    const classes = globalStyles()
    const person  = PersonProfiles[0]
    const feed = Posts

    return (
        <Container maxWidth={"md"}>
            <Grid container spacing={2}>
                <Box style={{display: "none"}} clone order={{xs: 2, sm: 1}}>
                    <Grid item xs={12} md={3} lg={3} sm={12}>
                        <Box mb={2}>
                            <Card style={{textAlign: 'center'}}>
                                <CardContent>
                                    <div className={classes.profilePhoto}>
                                        <Avatar className={clsx(classes.largeAvatar, classes.avatar)}
                                                style={{}}
                                                variant="circle"
                                                src={person.avatar}/>
                                    </div>

                                    <Typography variant="h6">{person.firstName} {person.lastName}</Typography>
                                    <Typography paragraph>{person.lastName}</Typography>

                                    <ProfileRating rating={3} />

                                </CardContent>
                            </Card>
                        </Box>

                    </Grid>
                </Box>
                <Box clone order={{xs: 1, sm: 2}}>
                    <Grid item xs={12}>
                        <StartAPostCard placeholder={"What's on your mind?"} />
                        <Box mb={2}>
                            { feed ? feed.map(p => <PostCard key={p.id} {...person} />) : "" }
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Container>
    )
}

export default Feed