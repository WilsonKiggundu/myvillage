import {IPerson} from "./IPerson";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import {getProfile, getUser} from "../../../services/User";
import {Typography} from "@material-ui/core";
import PostCard from "../../../components/PostCard";
import {IPost} from "../../../interfaces/IPost";
import {getPosts, getPostsByPersonId, selectAllPosts} from "../../posts/postsSlice";
import {get, getAsync, makeUrl} from "../../../utils/ajax";
import {Endpoints} from "../../../services/Endpoints";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import EventCard from "../../events/EventCard";
import {Alert} from "@material-ui/lab";
import grey from "@material-ui/core/colors/grey";

interface IProps {
    person: IPerson
}

const PersonPosts = ({person}: IProps) => {

    const user: IPerson = getProfile()
    const isMyProfile: boolean = person.id === user.id

    const dispatch = useDispatch()
    const feed = useSelector(selectAllPosts)
    const error = useSelector((state: any) => state.posts.error)

    const status = useSelector((state: any) => state.posts.status)

    useEffect(() => {
        if (status === 'idle'){
            dispatch(getPostsByPersonId(person.id))
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
        content =
            <Alert color={"error"} icon={false}>

                <Typography variant={"h5"} component={"h5"}>
                    Ooops. We are unable to get your feed...
                </Typography>

                <Box mt={2}>
                    <Typography variant={"body2"} component={"div"}>
                        {error}
                    </Typography>
                </Box>
            </Alert>
    }

    return (
        <Box mb={2}>
            <Typography style={{color: grey[400], margin: '30px 0 10px'}}>
                { isMyProfile ? "Your feed" : `${person.firstname}'s posts` }
            </Typography>
            {content}
        </Box>
    )
}

export default PersonPosts