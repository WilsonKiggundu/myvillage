import {Grid} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import React from "react";
import {Endpoints} from "../../services/Endpoints";
import {makeUrl, postAsync} from "../../utils/ajax";
import Toast from "../../utils/Toast";
import {useSelector} from "react-redux";
import {userSelector} from "../../data/coreSelectors";

interface IProps {
    showLabels: boolean
    id: any,
    bgColor?: string,
    iconSize?: 'sm' | 'lg'
}


const handleResponse = async (eventId: any, category: string, profileId: string) => {
    try {
        const endpoint = `${Endpoints.events.api}/${eventId}/attendance`
        const url = makeUrl("Events", endpoint)

        await postAsync(url, {
            category,
            profileId,
            id: eventId
        })

        Toast.success("Success")

    } catch (error) {
        Toast.error(error.toString())
    } finally {

    }
}

const EventActionButtons = ({id, showLabels, iconSize, bgColor}: IProps) => {

    const user = useSelector(userSelector)
    const profileId = user.profile.sub

    return (
        <Grid style={{backgroundColor: bgColor}} className='rsvp-buttons'>
            <Grid
                onClick={() => handleResponse(id, "maybe", profileId)}
                className="event-button-container">
                <CheckIcon className="event-action-button event-maybe-button"/><br/>
                {showLabels && iconSize === "lg" && <span className="event-maybe-text">May be</span>}
            </Grid>
            <Grid
                onClick={() => handleResponse(id, "not-attending", profileId)}
                className="event-button-container">
                <CloseIcon className="event-action-button event-not-attending-button"/><br/>
                {showLabels && iconSize === "lg" && <span className="event-not-attending-text">Not Attending</span>}
            </Grid>
            <Grid
                onClick={() => handleResponse(id, "attending", profileId)}
                className="event-button-container">
                <DoneAllIcon className="event-action-button event-attending-button"/><br/>
                {showLabels && iconSize === "lg" && <span className="event-attending-text">Attending</span>}
            </Grid>
        </Grid>
    )
}

export default EventActionButtons