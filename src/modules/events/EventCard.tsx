import {IEvent} from "../../interfaces/IEvent";
import {Grid, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {format, parseISO} from "date-fns";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import './event-card.css'
import notAttending from '../../utils/notAttending.png'
import maybeAttending from '../../utils/maybeAttending.png'
import attendingIcon from '../../utils/attending.png'
import Progress from '../../components/progress/Progress'
import XImageGridList from "../../components/XImageGridList";
import Box from "@material-ui/core/Box";
import CheckIcon from '@material-ui/icons/Check';
import {ChevronRight} from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FeaturedEvent from "./FeaturedEvent";
import EventActionButtons from "./EventActionButtons";
import EventListItem from "./EventListItem";

interface IProps {
    event: IEvent,
    featured?: boolean
}

const EventCard = ({event, featured}: IProps) => {
    return (
        <Grid container className='card-wrapper'>
            {featured ? <FeaturedEvent {...event} /> : <EventListItem {...event} />}
        </Grid>
    )
}

export default EventCard