import {IEvent} from "../../interfaces/IEvent";
import {Box, Button, Divider, Grid} from "@material-ui/core";
import React from "react";
import {format, parseISO} from "date-fns";
import './event-card.css'
import {useHistory} from "react-router-dom";
import {Urls} from "../../routes/Urls";
import {ChevronRight, LocationOn} from "@material-ui/icons";
import EventIcon from "@material-ui/icons/Event";
import {longDate, timeFormat} from "../../utils/dateHelpers";

const EventListItem = (event: IEvent) => {

    const history = useHistory()

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
                <div className="event-title">
                    <a href={Urls.singleEvent(event.id)}>
                        {event.title}
                    </a>
                </div>

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
                    <Grid item xs={12}>
                        <Grid container>

                            <Box mb={4} mt={4}>
                                <Grid spacing={2} container justify={"flex-start"}>
                                    <Grid item xs={12}>
                                        <div className="event-icon">
                                            <LocationOn color={"secondary"} style={{fontSize: 30}}/>
                                        </div>
                                        <strong>Location</strong><br/>
                                        <div>{event.location}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="event-icon">
                                            <EventIcon style={{fontSize: 30}}/>
                                        </div>
                                        <strong>Starts on</strong><br/>
                                        {longDate(event.startDateTime)}<br/>
                                        <span className="event-time">{timeFormat(event.startDateTime)}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="event-icon">
                                            <EventIcon style={{fontSize: 30}}/>
                                        </div>
                                        <strong>Ends on</strong><br/>
                                        {longDate(event.endDateTime)}<br/>
                                        <span className="event-time">{timeFormat(event.endDateTime)}</span>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={"outlined"} size={"medium"} color={"default"} disableElevation>
                            Details <ChevronRight />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventListItem