import {IFeed} from "../../interfaces/IFeed";
import PostCard from "../posts/PostCard";
import EventCard from "../events/EventCard";
import React from "react";

interface IProps {
    item: IFeed
}

export const FeedListItem = ({item}: IProps) => {
    switch (item.entityType) {
        case 1:
            return <PostCard post={item.entity}/>
        case 5:
            return <EventCard event={item.entity}/>
        default:
            return <>{item.entityType} --</>
    }
}