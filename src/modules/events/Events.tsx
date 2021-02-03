import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@material-ui/core";
import {XFab} from "../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import XDialog from "../../components/dialogs/XDialog";
import NewEvent from "./forms/NewEvent";
import {PleaseWait} from "../../components/PleaseWait";
import {useDispatch, useSelector} from "react-redux";
import {IEvent} from "../../interfaces/IEvent";
import EventCard from "./EventCard";
import {Alert} from "@material-ui/lab";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {isPast, isThisMonth, isThisWeek, isThisYear, isToday} from "../../utils/dateHelpers";
import {eventsSelector} from "./redux/eventsSelectors";
import {loadEvents} from "./redux/eventsActions";
import Typography from "@material-ui/core/Typography";
import {globalStyles} from "../../theme/styles";
import ErrorPage from "../exceptions/Error";
import {homeStyles} from "../home/styles";

type EventFilter = 'today' | 'week' | 'month' | 'year'

const EventsView = () => {

    const [openAddEventDialog, setOpenAddEventDialog] = useState<boolean>(false)

    const styles = homeStyles()
    const dispatch = useDispatch()
    const events = useSelector(eventsSelector)

    useEffect(() => {
        dispatch(loadEvents())
    }, [dispatch])

    const handleScroll = (e: any) => {
        const element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            if (events.request.hasMore) {
                dispatch(loadEvents())
            }
        }
    }

    const handleFilter = (filter: EventFilter) => {
        // let filtered = events
        // switch (filter) {
        //     case "today":
        //         filtered = filtered.filter((f: any) => isToday(f.startDateTime.replace(/ /g, "T")))
        //         break
        //     case "week":
        //         filtered = filtered.filter((f: any) => isThisWeek(f.startDateTime.replace(/ /g, "T")))
        //         break
        //     case "month":
        //         filtered = filtered.filter((f: any) => isThisMonth(f.startDateTime.replace(/ /g, "T")))
        //         break
        //     case "year":
        //         filtered = filtered.filter((f: any) => isThisYear(f.startDateTime.replace(/ /g, "T")))
        //         break
        //     default:
        //         break
        // }
        // setEvents(filtered)
    }

    if (events.isLoading) return <PleaseWait/>
    if (events.error) return (
        <ErrorPage title={"Loading events failed"} message={events.error} />
    )

    return (
        <Container onScroll={handleScroll} className={styles.scrollable} maxWidth={false}>
            <Grid container spacing={2} justify={"center"}>

                <Grid item xs={12} md={10} lg={8}>
                    {/*<Box ml={2} mr={2} mt={2} mb={2}>*/}
                    {/*    <ButtonGroup size={"small"} color="secondary" aria-label="contained secondary button group">*/}
                    {/*        <Button onClick={() => handleFilter("today")}>Today</Button>*/}
                    {/*        <Button onClick={() => handleFilter("week")}>This Week</Button>*/}
                    {/*        <Button onClick={() => handleFilter("month")}>This Month</Button>*/}
                    {/*        <Button onClick={() => handleFilter("year")}>This Year</Button>*/}
                    {/*    </ButtonGroup>*/}
                    {/*</Box>*/}
                    <Box mt={2}>
                        {
                            events.data
                                .slice()
                                .sort((a: IEvent, b: IEvent) => a.startDateTime.localeCompare(b.startDateTime))
                                .filter((event: IEvent) => !isPast(event.startDateTime))
                                .map((event: IEvent, index: number) => (
                                    <Grid key={index} item xs={12}>
                                        <Box mb={4}>
                                            <EventCard event={event}/>
                                        </Box>
                                    </Grid>
                                ))
                        }
                    </Box>
                </Grid>
            </Grid>

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
        </Container>
    )

}

export default EventsView