import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import StartAPostCard from "../posts/forms/StartAPostCard";
import PostCard from "../posts/PostCard";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import {IPost} from "../../interfaces/IPost";
import {loadPosts} from "../posts/redux/postsActions";
import _ from "lodash";
import {postsSelector} from "../posts/redux/postsSelectors";
import {PostContentLoader} from "../../components/loaders/PostContentLoader";

import ErrorPage from "../exceptions/Error";
import {scrolledToBottom} from "../../utils/scrollHelpers";

const Feed = () => {

    const dispatch = useDispatch()
    const posts = useSelector(postsSelector)

    useEffect(() => {

        document.title = 'Feed / My Village'

        window.addEventListener('scroll', () => {
            if (posts.request.hasMore && scrolledToBottom()) {
                dispatch(loadPosts())
            }
        })
    })

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    if (_.isEmpty(posts.data) && posts.isLoading) return (
        <Container maxWidth={"md"}>
            <PostContentLoader/>
        </Container>
    )

    if (posts.error) return (
        <ErrorPage title={"Loading feed failed"} message={posts.error}/>
    )

    return (
        <Container maxWidth={"md"}>
            <Grid container spacing={2} justify={"center"}>
                <Grid item>
                    <StartAPostCard placeholder={"What's on your mind?"}/>
                    <Box>
                        {_.isEmpty(posts.data) && <p>No results found</p>}
                        {
                            posts.data.map((post: IPost, index: number) =>
                                <PostCard post={post} key={index}/>)
                        }
                        {posts.isLoading && (
                            <PleaseWait/>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Feed