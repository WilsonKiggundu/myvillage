import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@material-ui/core";
import {XFab} from "../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import {PleaseWait} from "../../components/PleaseWait";
import {useDispatch, useSelector} from "react-redux";
import {IEvent} from "../../interfaces/IEvent";
import EventCard from "./EventCard";
import Box from "@material-ui/core/Box";
import {eventsSelector} from "./redux/eventsSelectors";
import {loadEvents} from "./redux/eventsActions";
import ErrorPage from "../exceptions/Error";

import {scrolledToBottom} from "../../utils/scrollHelpers";
import {Urls} from "../../routes/Urls";
import {userSelector} from "../../data/coreSelectors";
import {XLoginSnackbar} from "../../components/XLoginSnackbar";

type EventFilter = 'today' | 'week' | 'month' | 'year'

const EventsView = () => {

    const [openAddEventDialog, setOpenAddEventDialog] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const dispatch = useDispatch()
    const events = useSelector(eventsSelector)
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadEvents())
    }, [dispatch])

    useEffect(() => {

        document.title = 'Events / My Village'

        window.addEventListener('scroll', () => {
            if (events.request.hasMore && scrolledToBottom()) {
                dispatch(loadEvents())
            }
        })
    })

    const handleCreate = () => {
        if (user) {
            window.location.replace(Urls.createEvent)
        } else {
            setOpenSnackbar(true)
        }
    }

    if (events.isLoading) return <PleaseWait label={"Loading events..."}/>
    if (events.error) return (
        <ErrorPage title={"Loading events failed"} message={events.error}/>
    )

    return (
        <Container maxWidth={"md"}>
            {
                events.data
                    .slice()
                    .sort((a: IEvent, b: IEvent) => a.startDateTime.localeCompare(b.startDateTime))
                    // .filter((event: IEvent) => !isPast(event.startDateTime))
                    .map((event: IEvent, index: number) => (
                        <Grid key={index} spacing={2} container>
                            <Grid item xs={12}>
                                <Box mb={2}>
                                    <EventCard featured={index === 0} event={event}/>
                                </Box>
                            </Grid>
                        </Grid>
                    ))
            }

            <XFab
                onClick={handleCreate}
                position={"fixed"}
                bottom={20}
                right={20}
                color={"secondary"}>
                <AddIcon/>
            </XFab>

            {
                !user && <XLoginSnackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}/>
            }

        </Container>
    )

}

export default EventsView