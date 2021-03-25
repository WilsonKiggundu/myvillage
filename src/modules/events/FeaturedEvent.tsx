import {Divider, Grid} from "@material-ui/core";
import Progress from "../../components/progress/Progress";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import {IEvent} from "../../interfaces/IEvent";
import {format, parseISO} from "date-fns";
import EventActionButtons from "./EventActionButtons";
import EventAttachments from "./EventAttachments";
import {Urls} from "../../routes/Urls";
import {useHistory} from "react-router-dom";

const FeaturedEvent = (event: IEvent) => {

    const history = useHistory()

    let eventDate = format(parseISO(event.startDateTime), "eeee, d MMMM, yyy")
    let startingTime = format(parseISO(event.startDateTime), "h:mma")
    let endingTime = format(parseISO(event.endDateTime), "h:mma z")

    const handleViewEvent = (eventId: any) => {
        history.push(Urls.singleEvent(eventId))
    }

    return (
        <div className="event-body">
            <div onClick={() => handleViewEvent(event.id)}>
                <div className="featured-text">
                    Featured Event
                </div>
                <div className='date-and-progress'>
                    <div className="event-date-time">
                        <strong>{eventDate}</strong><br/>
                        <small>{startingTime} - {endingTime}</small>
                    </div>
                </div>

                <Grid container>
                    <Grid item xs={12} className="event-title">
                        <a href={Urls.singleEvent(event.id)}>
                            {event.title}
                        </a>
                    </Grid>
                    <Grid item xs={12} className='event-details'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: event.details
                            }}
                        />
                    </Grid>
                    {
                        event.location &&
                        <Grid item xs={12} className='event-location'>
                            <LocationOnIcon className="event-location-icon"/>
                            <span className="event-location-venue">{event.location}</span>
                        </Grid>
                    }
                </Grid>
            </div>
            {
                event.uploads && <div className='event-bg-wrapper'>
                    <Box mb={2} ml={1} mr={1}>
                        <EventAttachments uploads={event.uploads} />
                        {/*<XImageGridList images={event.uploads}/>*/}
                    </Box>
                </div>
            }

            <Divider/>

            <Box mt={2}>
                <Grid
                    className="featured-event-button-container"
                    container
                    justify={"center"}>
                    <Grid item xs={12}>
                        <EventActionButtons
                            iconSize={"lg"}
                            bgColor={"#ffffff"}
                            showLabels
                            id={event.id}/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default FeaturedEvent