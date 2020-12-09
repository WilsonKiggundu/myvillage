import React, {useEffect, useState} from "react";
import {globalStyles} from "../../theme/styles"
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import StartAPostCard from "../../components/StartAPostCard";
import PostCard from "../../components/PostCard";
import {getUser} from "../../services/User";
import {IPost} from "../../interfaces/IPost";
import {get, makeUrl} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import Toast from "../../utils/Toast";
import {IFeed} from "../../interfaces/IFeed";
import EventCard from "../events/EventCard";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import {IEvent} from "../../interfaces/IEvent";
import {Alert} from "@material-ui/lab";
import {selectAllPosts, getPosts} from "../posts/postsSlice";
import {getComments} from "../posts/commentsSlice";


const Feed = ({match}: any) => {
    const classes = globalStyles()
    const user = getUser()

    const dispatch = useDispatch()
    const feed = useSelector(selectAllPosts)
    const error = useSelector((state: any) => state.posts.error)

    const status = useSelector((state: any) => state.posts.status)

    useEffect(() => {
        if (status === 'idle'){
            dispatch(getPosts())
        }
    }, [status, dispatch])

    let content;
    if(status === 'loading') return <PleaseWait />
    else if(status === 'succeeded'){
        const orderedByDate = feed?.slice().sort((a: any, b: any) => b.dateCreated.localeCompare(a.dateCreated))

        content = orderedByDate ? orderedByDate.map((item: any, index: number) => {

            switch (item.entityType) {
                case 1:
                    return <PostCard key={index} post={item}/>
                case 5:
                    return <EventCard key={index} event={item}/>
                default:
                    return <PostCard key={index} post={item}/>
            }
        }) : ""
    }else{
        content = <Grid item md={6}>
            <Alert
                title={"We failed to get the events..."}
                color={"error"} icon={false}>
                {error}
            </Alert>
        </Grid>
    }

    return (
        <Container maxWidth={"md"}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StartAPostCard placeholder={"What's on your mind?"}/>
                    <Box mb={2}>
                        {content}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Feed