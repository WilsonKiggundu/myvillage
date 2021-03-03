import {IEvent} from "../../interfaces/IEvent";
import {Grid} from "@material-ui/core";
import XImageGridList from "../../components/XImageGridList";
import Progress from "../../components/progress/Progress";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventActionButtons from "./EventActionButtons";
import React, {useState} from "react";
import {format, parseISO} from "date-fns";
import './event-card.css'

const EventListItem = (event: IEvent) => {

    const [attending, setAttending] = useState(6)

    const expectedAttendees = 25
    const score = Math.round((attending / expectedAttendees) * 10000) / 100;

    let eventDate = format(parseISO(event.startDateTime), "eeee, d MMMM, yyy")
    let startingTime = format(parseISO(event.startDateTime), "h:mma")
    let endingTime = format(parseISO(event.endDateTime), "h:mma z")

    return (
        <>
            {event.images?.length && (
                <Grid item lg={4}>
                    <Grid className='event-bg-wrapper'>
                        <XImageGridList images={[event.images[0]]}/>
                    </Grid>
                </Grid>
            )}
            <Grid item lg={8} className='event-description'>
                <Grid className='title-and-progress'>
                    <div className="event-title">
                        {event.title}
                    </div>
                    {event.attendees &&
                    <Grid className='progress-bar'>
                        <Progress
                            score={70}
                            style={{
                                opacity: 2,
                                width: `${score}%`,
                                height: '8px',
                                cardWidth: '100px'
                            }}
                        >
                        </Progress>
                        <strong>{attending}/{expectedAttendees} attending</strong>
                    </Grid>
                    }
                </Grid>
                <Grid>
                    <Typography variant={'body2'} className='event-details'>
                        {event.details}
                    </Typography>
                </Grid>
                <Grid
                    container
                    className='event-rsvp'
                    justify={"space-between"}
                >
                    <Grid item lg={6}>

                        <Grid container>
                            <Grid item xs={12} className='event-location'>
                                <LocationOnIcon className="event-location-icon" />
                                <span className="event-location-venue">{event.location}</span>
                            </Grid>

                            <Grid style={{marginTop: '-25px'}} item xs={12}>
                                <div className="event-date-time">
                                    <strong>{eventDate}</strong><br/>
                                    <small>{startingTime} - {endingTime}</small>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item lg={6}>
                        <EventActionButtons iconSize={"sm"} showLabels={true} id={event.id} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default EventListItem