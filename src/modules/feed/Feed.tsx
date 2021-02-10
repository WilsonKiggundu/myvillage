import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import StartAPostCard from "../../components/StartAPostCard";
import PostCard from "../posts/PostCard";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import {IPost} from "../../interfaces/IPost";
import {loadPosts} from "../posts/redux/postsActions";
import _ from "lodash";
import {postsSelector} from "../posts/redux/postsSelectors";
import {PostContentLoader} from "../../components/loaders/PostContentLoader";

import ErrorPage from "../exceptions/Error";
import {homeStyles} from "../home/styles";

interface IProps {
}

const Feed = () => {

    const styles = homeStyles()
    const dispatch = useDispatch()
    const posts = useSelector(postsSelector)

    const handleScroll = (event: any) => {
        const element = event.target
        if(element.scrollHeight - element.scrollTop === element.clientHeight){
            if(posts.request.hasMore){
                dispatch(loadPosts())
            }
        }
    }

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    if (_.isEmpty(posts.data) && posts.isLoading) return (
        <Container maxWidth={"md"}>
            <PostContentLoader />
        </Container>
    )

    if (posts.error) return (
        <ErrorPage title={"Loading feed failed"} message={posts.error} />
    )

    return (
        <Container onScroll={handleScroll} className={styles.scrollable} maxWidth={false}>
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={12} md={6}>
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