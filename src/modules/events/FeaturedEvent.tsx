import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Progress from "../../components/progress/Progress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Box from "@material-ui/core/Box";
import XImageGridList from "../../components/XImageGridList";
import React, {useState} from "react";
import {IEvent} from "../../interfaces/IEvent";
import {format, parseISO} from "date-fns";
import EventActionButtons from "./EventActionButtons";
import {Urls} from "../../routes/Urls";

const FeaturedEvent = (event: IEvent) => {

    const [attending, setAttending] = useState(6)

    const expectedAttendees = 25
    const score = Math.round((attending / expectedAttendees) * 10000) / 100;

    let eventDate = format(parseISO(event.startDateTime), "eeee, d MMMM, yyy")
    let startingTime = format(parseISO(event.startDateTime), "h:mma")
    let endingTime = format(parseISO(event.endDateTime), "h:mma z")

    return (
        <Grid item xs={12} lg={8}>
            <Grid className="event-body">
                <Grid>
                    <Typography
                        className="featured-text"
                        variant={'body2'}>
                        Featured Event
                    </Typography>
                    <Grid className='date-and-progress'>
                        <Grid>
                            <div className="event-date-time">
                                <strong>{eventDate}</strong><br/>
                                <small>{startingTime} - {endingTime}</small>
                            </div>
                        </Grid>
                        {event.attendees && <Progress
                            score={70}
                            style={{
                                opacity: 2,
                                width: `${score}%`,
                                height: '15px',
                                cardWidth: '100px',
                            }}
                        >
                            <strong><span style={{color: '#D0D3D4'}}>{attending}</span>/{expectedAttendees}
                            </strong>
                        </Progress>}
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item xs={12} className="event-title">
                        {event.title}
                    </Grid>
                    <Grid item xs={12} className='event-details'>
                        {event.details}
                    </Grid>
                    <Grid item xs={12} className='event-location'>
                        <LocationOnIcon className="event-location-icon"/>
                        <span className="event-location-venue">{event.location}</span>
                    </Grid>
                </Grid>
            </Grid>
            {
                event.images?.length && <div className='event-bg-wrapper'>
                    <Box mb={2} ml={1} mr={1}>
                        <XImageGridList images={event.images}/>
                    </Box>
                </div>
            }

            <Grid className="featured-event-button-container" container justify={"space-between"}>
                <Grid className="event-button-container" item xs={2}>

                </Grid>
                <Grid item xs={6}>
                    <EventActionButtons iconSize={"lg"} bgColor={"#E5E5E5"} showLabels id={event.id}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FeaturedEvent