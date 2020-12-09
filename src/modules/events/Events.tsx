import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@material-ui/core";
import {XFab} from "../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import XDialog from "../../components/dialogs/XDialog";
import NewEvent from "./forms/NewEvent";
import {globalStyles} from "../../theme/styles";
import {PleaseWait} from "../../components/PleaseWait";
import {useSelector, useDispatch} from "react-redux";
import store from "../../data/store";
import {getEvents, selectAllEvents} from './eventSlice'
import {IEvent} from "../../interfaces/IEvent";
import EventCard from "./EventCard";
import {Alert} from "@material-ui/lab";

const EventsView = () => {

    const classes = globalStyles()
    const [openAddEventDialog, setOpenAddEventDialog] = useState<boolean>(false)

    const dispatch = useDispatch()
    const events = useSelector(selectAllEvents)
    const error = useSelector((state: any) => state.events.error)

    const status = useSelector((state: any) => state.events.status)

    useEffect(() => {
        if (status === 'idle'){
            dispatch(getEvents())
        }
    }, [status, dispatch])

    let content;
    if(status === 'loading') return <PleaseWait />
    else if(status === 'succeeded'){
        content = events.map((event: IEvent, index: number) => (
            <Grid key={index} item xs={12} md={4}>
                <EventCard event={event} />
            </Grid>
        ))
    }else{
        content = <Grid item md={6}>
            <Alert
                title={"We failed to get the events..."}
                color={"error"} icon={false}>
                <h3>We failed to get the events...</h3>
                {error}
            </Alert>
        </Grid>
    }

    return (
        <>
            <XFab
                onClick={() => setOpenAddEventDialog(true)}
                position={"fixed"}
                bottom={20}
                right={20}
                color={"secondary"}>
                <AddIcon/>
            </XFab>

            <XDialog
                maxWidth={"md"}
                title={"Add an event"}
                open={openAddEventDialog}
                onClose={() => setOpenAddEventDialog(false)}>
                <NewEvent
                    onClose={() => setOpenAddEventDialog(false)}/>
            </XDialog>

            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>
                {content}
                </Grid>
            </Container>
        </>
    )
}

export default EventsView