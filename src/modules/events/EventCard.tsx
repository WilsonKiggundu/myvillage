import {IEvent} from "../../interfaces/IEvent";
import React from "react";
import './event-card.css'
import FeaturedEvent from "./FeaturedEvent";
import EventListItem from "./EventListItem";

interface IProps {
    event: IEvent,
    featured?: boolean
}

const EventCard = ({event, featured}: IProps) => {
    return  <EventListItem {...event} />
}

export default EventCard