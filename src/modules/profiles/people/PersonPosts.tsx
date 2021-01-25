import {IPerson} from "./IPerson";
import Box from "@material-ui/core/Box";
import React, {useEffect} from "react";
import {Typography} from "@material-ui/core";
import PostCard from "../../posts/PostCard";
import {useDispatch, useSelector} from "react-redux";
import {PleaseWait} from "../../../components/PleaseWait";
import EventCard from "../../events/EventCard";
import {Alert} from "@material-ui/lab";

interface IProps {
    person: IPerson
    canEdit: boolean
}

const PersonPosts = ({person, canEdit}: IProps) => {

    const dispatch = useDispatch()
    // const feed = useSelector(selectAllPosts)
    // const error = useSelector((state: any) => state.posts.error)

    const status = useSelector((state: any) => state.posts.status)

    useEffect(() => {
        if (status === 'idle') {
            //dispatch(getPostsByPersonId(person.id))
        }
    }, [status, person.id, dispatch])

    let content = undefined;
    //
    // if (status === 'loading') return <PleaseWait/>
    // else if (status === 'succeeded') {
    //     const orderedByDate = feed?.slice().sort((a: any, b: any) => b.dateCreated.localeCompare(a.dateCreated))
    //
    //     content = orderedByDate.length ? orderedByDate.map((item: any, index: number) => {
    //         switch (item.entityType) {
    //             case 1:
    //                 return <PostCard key={index} post={item}/>
    //             case 5:
    //                 return <EventCard key={index} event={item}/>
    //             default:
    //                 return <PostCard key={index} post={item}/>
    //         }
    //     }) : null
    //
    // } else {
    //     content =
    //         <Alert color={"error"} icon={false}>
    //
    //             <Typography variant={"h5"} component={"h5"}>
    //                 Ooops. We are unable to get your feed...
    //             </Typography>
    //
    //             <Box mt={2}>
    //                 <Typography variant={"body2"} component={"div"}>
    //                     {error}
    //                 </Typography>
    //             </Box>
    //         </Alert>
    // }

    if (content) {
        return (
            <Box mb={2}>
                {content}
            </Box>
        )
    }

    return null
}

export default PersonPosts