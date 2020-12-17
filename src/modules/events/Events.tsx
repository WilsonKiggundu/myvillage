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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {isThisMonth, isThisWeek, isThisYear, isToday} from "../../utils/dateHelpers";
import {isThisISOWeek} from "date-fns";

type EventFilter = 'today' | 'week' | 'month' | 'year'

const EventsView = () => {

    const classes = globalStyles()
    const [openAddEventDialog, setOpenAddEventDialog] = useState<boolean>(false)

    const dispatch = useDispatch()
    const results = useSelector(selectAllEvents)
    const error = useSelector((state: any) => state.events.error)

    const [events, setEvents] = useState<IEvent[]>([])

    const status = useSelector((state: any) => state.events.status)


    useEffect(() => {
        if (status === 'idle'){
            dispatch(getEvents())
        }
        setEvents(results)
    }, [status, dispatch])

    let content;
    if(status === 'loading') return <PleaseWait />
    else if(status === 'succeeded'){

        const ordered = events.slice().sort((a: IEvent, b: IEvent) => a.startDateTime.localeCompare(b.startDateTime))

        content = ordered.map((event: IEvent, index: number) => (
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

    const handleFilter = (filter: EventFilter) => {
        let filtered = results
        switch (filter){
            case "today":
                filtered = filtered.filter((f: any) => isToday(f.startDateTime.replace(/ /g,"T")))
                break
            case "week":
                filtered = filtered.filter((f: any) => isThisWeek(f.startDateTime.replace(/ /g,"T")))
                break
            case "month":
                filtered = filtered.filter((f: any) => isThisMonth(f.startDateTime.replace(/ /g,"T")))
                break
            case "year":
                filtered = filtered.filter((f: any) => isThisYear(f.startDateTime.replace(/ /g,"T")))
                break
            default:
                break
        }
        setEvents(filtered)
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

                <Grid container justify={"center"} spacing={2}>
                    <Box mt={2} ml={1} mr={1} mb={3}>
                            <ButtonGroup size={"small"} color="primary" aria-label="outlined primary button group">
                                <Button onClick={() => handleFilter("today")}>Today</Button>
                                <Button onClick={() => handleFilter("week")}>This Week</Button>
                                <Button onClick={() => handleFilter("month")}>This Month</Button>
                                <Button onClick={() => handleFilter("year")}>This Year</Button>
                            </ButtonGroup>
                    </Box>
                </Grid>

                <Grid container spacing={2}>
                {content}
                </Grid>
            </Container>
        </>
    )
}

export default EventsView