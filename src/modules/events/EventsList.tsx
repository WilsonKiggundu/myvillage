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
import Calendar from "./Calendar";
import {Alert} from "@material-ui/lab";

type EventFilter = 'today' | 'week' | 'month' | 'year'
type EventView = 'calendar' | 'list'

const EventsList = () => {

    const [openAddEventDialog, setOpenAddEventDialog] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [eventsView, setEventsView] = useState<EventView>("list")

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
        <>
            {/*<Box mb={2}>*/}
            {/*    <Grid container justify={"center"}>*/}
            {/*        <Grid item>*/}
            {/*            <ButtonGroup color={"primary"}>*/}
            {/*                <Button onClick={() => setEventsView("list")}>*/}
            {/*                    <ListIcon/>*/}
            {/*                </Button>*/}
            {/*                <Button onClick={() => setEventsView("calendar")}>*/}
            {/*                    <CalendarTodayIcon/>*/}
            {/*                </Button>*/}
            {/*            </ButtonGroup>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}

            {eventsView === "list" &&
            <Container maxWidth={"lg"}>
                <Grid spacing={2} container>
                    {events.data.length ? events.data
                            .slice()
                            .sort((a: IEvent, b: IEvent) => a.startDateTime.localeCompare(b.startDateTime))
                            // .filter((event: IEvent) => !isPast(event.startDateTime))
                            .map((event: IEvent, index: number) => (
                                <Grid key={index} item xs={12} md={6} lg={4}>
                                    <Box mb={2}>
                                        <EventCard event={event}/>
                                    </Box>
                                </Grid>
                            )) :
                        <Alert variant={"outlined"} severity={"info"}>
                            No events found
                        </Alert>
                    }
                </Grid>
            </Container>
            }

            {eventsView === "calendar" && <Calendar events={events.data.map((event: any) => ({
                id: event.id,
                start: event.startDateTime,
                end: event.endDateTime,
                title: event.title,
                description: event.details
            }))}/>}

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

        </>
    )

}

export default EventsList