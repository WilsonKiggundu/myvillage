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
import {userSelector} from "../../data/coreSelectors";
import {handleLogin} from "../../utils/authHelpers";
import ArticleListItem from "../articles/ArticleListItem";
import EventListItem from "../events/EventListItem";
import EventPostCard from "../posts/EventPostCard";
import JobPostCard from "../posts/JobPostCard";

const Feed = () => {

    const dispatch = useDispatch()
    const posts = useSelector(postsSelector)

    const user = useSelector(userSelector)

    if (!user) handleLogin()

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
            <Grid container spacing={2} justify={"center"}>
                <Grid xs={12} md={10} lg={8} item>
                    <PostContentLoader/>
                </Grid>
            </Grid>
        </Container>
    )

    if (posts.error) return (
        <ErrorPage title={"Loading feed failed"} message={posts.error}/>
    )

    return (
        <Container maxWidth={"md"}>
            <Grid container spacing={2} justify={"center"}>
                <Grid xs={12} md={10} lg={8} item>
                    <StartAPostCard placeholder={"What's on your mind?"}/>
                    <Box>
                        {_.isEmpty(posts.data) && <p>No results found</p>}
                        {
                            posts.data.map((post: IPost, index: number) => {

                                switch (post.type) {
                                    case 1: return <PostCard post={post} key={post.id}/>
                                    case 4: return <Box key={post.id} mt={2}>
                                        <ArticleListItem id={post.referenceId} article={post} />
                                    </Box>
                                    case 5: return <Box key={post.id} mt={2}>       
                                        <EventPostCard post={post} id={post.ref} />
                                    </Box>
                                    case 6: return <Box key={post.id} mt={2}>
                                        <JobPostCard post={post} id={post.referenceId} />
                                    </Box>
                                    default: return <PostCard post={post} key={post.id}/>
                                }

                            })
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