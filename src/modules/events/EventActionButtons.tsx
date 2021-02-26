import {Grid} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import React from "react";

interface IProps {
    showLabels: boolean
    id: any,
    bgColor?: string,
    iconSize?: 'sm' | 'lg'
}

const EventActionButtons = ({id, showLabels, iconSize, bgColor}: IProps) => {
    return (
        <Grid style={{backgroundColor: bgColor}} className='rsvp-buttons'>
            <Grid className="event-button-container">
                <CheckIcon className="event-action-button event-maybe-button" /><br/>
                {showLabels && iconSize === "lg" && <span className="event-maybe-text">May be</span>}
            </Grid>
            <Grid className="event-button-container">
                <CloseIcon className="event-action-button event-not-attending-button" /><br/>
                {showLabels && iconSize === "lg" && <span className="event-not-attending-text">Not Attending</span>}
            </Grid>
            <Grid className="event-button-container">
                <DoneAllIcon className="event-action-button event-attending-button" /><br/>
                {showLabels && iconSize === "lg" && <span className="event-attending-text">Attending</span>}
            </Grid>
        </Grid>
    )
}

export default EventActionButtons