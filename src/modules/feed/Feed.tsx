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
import {Posts} from "../../data/mockData";
import {IPerson} from "../profiles/people/IPerson";
import {getUser} from "../../services/User";


const Feed = ({match}: any) => {
    const classes = globalStyles()
    const user = getUser()
    const feed = Posts

    return (
        <Container maxWidth={"md"}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StartAPostCard placeholder={"What's on your mind?"}/>
                    <Box mb={2}>
                        {feed ? feed.map(p => <PostCard key={p.id} {...user} />) : ""}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Feed