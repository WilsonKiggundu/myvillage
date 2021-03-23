import {IEvent} from "../../interfaces/IEvent";
import {Box, Grid} from "@material-ui/core";
import Progress from "../../components/progress/Progress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import React, {useState} from "react";
import {format, parseISO} from "date-fns";
import './event-card.css'
import {useHistory} from "react-router-dom";
import {Urls} from "../../routes/Urls";

const EventListItem = (event: IEvent) => {

    const history = useHistory()
    const [attending, setAttending] = useState(6)

    const expectedAttendees = 25
    const score = Math.round((attending / expectedAttendees) * 10000) / 100;

    let eventDate = format(parseISO(event.startDateTime), "eeee, d MMMM, yyy")
    let startingTime = format(parseISO(event.startDateTime), "h:mma")
    let endingTime = format(parseISO(event.endDateTime), "h:mma z")

    let div = document.createElement("div")
    div.innerHTML = event.details

    const eventDetails = div.textContent || div.innerText || ""

    const handleViewEvent = (eventId: any) => {
        history.push(Urls.singleEvent(eventId))
    }

    return (
        <div onClick={() => handleViewEvent(event.id)} className="event-body">
            {event.uploads && (
                <Grid item lg={4}>
                    <Grid className='event-bg-wrapper'>
                        {/*<XImageGridList images={[event.uploads[0]]}/>*/}
                    </Grid>
                </Grid>
            )}
            <Grid item lg={event.uploads?.length ? 8 : 12} className='event-description'>
                <Grid className='title-and-progress'>
                    <div className="event-title">
                        <a href="">
                            {event.title}
                        </a>
                    </div>
                    {
                        event.attendances &&
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

                {
                    eventDetails && <Box mt={3} mb={2}>
                        <div className="event-details-teaser">
                            {eventDetails}
                        </div>
                    </Box>
                }
                <Grid
                    container
                    className='event-rsvp'
                    justify={"space-between"}
                >
                    <Grid item xs={12} lg={6}>
                        <Grid container>
                            {
                                event.location &&
                                <Grid item xs={12} className='event-location'>
                                    <LocationOnIcon className="event-location-icon"/>
                                    <span className="event-location-venue">{event.location}</span>
                                </Grid>
                            }

                            <Grid style={{marginTop: '-25px'}} item xs={12}>
                                <div className="event-date-time">
                                    <strong>{eventDate}</strong><br/>
                                    <small>{startingTime} - {endingTime}</small>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        {/*<EventActionButtons iconSize={"sm"} showLabels={true} id={event.id} />*/}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventListItem