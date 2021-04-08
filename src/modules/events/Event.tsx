import {IEvent} from "../../interfaces/IEvent";
import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import Container from "@material-ui/core/Container";
import {Urls} from "../../routes/Urls";
import {getEventById, postEvent} from "./redux/eventsEndpoints";
import {userSelector} from "../../data/coreSelectors";
import Toast from "../../utils/Toast";
import userManager from "../../utils/userManager";
import XDrawer, {Anchor} from "../../components/drawer/XDrawer";
import {IApplicant} from "../../interfaces/IApplicant";
import {longDate, timeAgo, timeFormat} from "../../utils/dateHelpers";
import {useHistory} from "react-router-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

import './event-card.css'
import {LocationOn} from "@material-ui/icons";
import EventActionButtons from "./EventActionButtons";
import EventAttachments from "./EventAttachments";
import {getAsync, getWithoutLoginAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPerson} from "../profiles/people/IPerson";

const Event = ({match}: any) => {

    const history = useHistory()
    const user = useSelector(userSelector)
    const id = parseInt(match.params.id, 10)
    const [event, setEvent] = useState<IEvent | undefined>(undefined)

    const [applyButton, setApplyButton] = useState<any>({label: 'Apply now', visible: true, disabled: false})
    const [alreadyApplied, setAlreadyApplied] = useState<boolean>(false)
    const [canApply, setCanApply] = useState<boolean>(false)

    const [allResponses, setAllResponses] = useState<any>([])
    const [maybeResponses, setMaybeResponses] = useState<any>([])
    const [attendingResponses, setAttendingResponses] = useState<any>([])
    const [notAttendingResponses, setNotAttendingResponses] = useState<any>([])

    useEffect(() => {

        (async () => {
            try {
                const response: any = await getEventById(id)

                const event = response.body
                setEvent(event)

                document.title = `${event.title} / My Village`

            } catch (e) {

                if (e.toString().includes('Unauthorized')) {
                    await userManager.signinRedirect({
                        state: window.location.pathname
                    })
                }

            } finally {

            }

        })()
    }, [id])

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [drawerAnchor, setDrawerAnchor] = useState<Anchor>("right")
    const [attendances, setAttendances] = useState<[] | undefined>(undefined)

    const toggleDrawer = async (anchor: Anchor, open: boolean) => {
        setOpenDrawer(open)
        setDrawerAnchor(anchor)

        if (open) {
            const attendances: any = []

            if (event?.attendances) {
                const url = makeUrl("Profiles", Endpoints.person.base)

                await Promise.all(event.attendances.map(async (attendance: any) => {
                    const response: any = await getWithoutLoginAsync(url, {id: attendance.profileId})
                    const person: IPerson = response.body.persons[0]

                    if (person){
                        attendances.push({
                            // id: attendance.id,
                            avatar: person.avatar ?? "",
                            profileId: attendance.profileId,
                            // date: timeAgo(attendance.dateTime),
                            name: person.firstname + " " + person.lastname,
                            category: attendance.category
                        })
                    }


                }))

                setAllResponses(attendances)
                setMaybeResponses(attendances.filter((f: any) => f.category === 'maybe'))
                setNotAttendingResponses(attendances.filter((f: any) => f.category === 'not-attending'))
                setAttendingResponses(attendances.filter((f: any) => f.category === 'attending'))

                setAttendances(attendances)
            }

        }

    }

    const handleViewAttendant = (profileId: string, category: string, eventName: string) => {
        const query: any = {
            eventId: event?.id,
            eventName: eventName,
            category: category,
            context: "event_attendance"
        }

        const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        const url = Urls.profiles.onePerson(profileId)
        history.push({
            pathname: url,
            search: `?${queryString}`
        })
    }

    return (
        <Container maxWidth={"md"}>
            <Grid justify={"center"} container spacing={2}>
                <Grid item xs={12}>
                    {event ? (
                        <>
                            <Box mb={2}>
                                <Card>
                                    <CardHeader
                                        title={
                                            <div className="event-title">
                                                {event.title}
                                            </div>
                                        }
                                        subheader={
                                            <div className="event-category">
                                                {longDate(event.startDateTime)}
                                            </div>
                                        }/>

                                    <Divider/>

                                    <CardContent>
                                        <Grid spacing={2} container justify={"flex-start"}>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <div className="event-location-icon">
                                                    <LocationOn/>
                                                </div>
                                                <div>{event.location}</div>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Starts on</strong><br/>
                                                {longDate(event.startDateTime)}<br/>
                                                <span className="event-time">{timeFormat(event.startDateTime)}</span>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Ends on</strong><br/>
                                                {longDate(event.endDateTime)}<br/>
                                                <span className="event-time">{timeFormat(event.endDateTime)}</span>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={4} lg={3}>
                                                <strong>Event type</strong><br/>
                                                {event.type}
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                    <Divider/>

                                    <CardContent>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: event.details
                                            }}
                                        />

                                        <EventAttachments uploads={event.uploads}/>
                                    </CardContent>

                                    <Divider/>

                                    <CardContent>
                                        <Grid
                                            className="featured-event-button-container"
                                            container
                                            spacing={2}
                                            justify={"flex-start"}>
                                            <Grid item xs={12}>
                                                <EventActionButtons
                                                    iconSize={"lg"}
                                                    bgColor={"#ffffff"}
                                                    showLabels
                                                    id={event.id}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                                    {
                                        event.attendances?.length ?
                                            <>
                                                <Divider/>

                                                <CardContent>
                                                    <Grid container justify={"center"}>
                                                        <Grid item>
                                                            <Button
                                                                onClick={() => toggleDrawer("right", true)}
                                                                color={"default"}
                                                                variant={"outlined"}>
                                                                {event.attendances?.length} responses
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>

                                                <XDrawer
                                                    onClose={() => toggleDrawer("right", false)}
                                                    open={openDrawer}
                                                    anchor={drawerAnchor}>
                                                    <div className="Drawer">
                                                        {
                                                            attendances ?
                                                                <>

                                                                    <List
                                                                        subheader={
                                                                            <ListSubheader
                                                                                className="Drawer-subheader">
                                                                                Attendance
                                                                            </ListSubheader>
                                                                        }>

                                                                        <div
                                                                            className="application-button-group">
                                                                            <ButtonGroup color={"default"}>
                                                                                <Button
                                                                                    onClick={() => setAttendances(allResponses)}>
                                                                                    All
                                                                                    ({allResponses.length})
                                                                                </Button>
                                                                                {
                                                                                    maybeResponses.length ?
                                                                                        <Button
                                                                                            onClick={() => setAttendances(maybeResponses)}>
                                                                                            May be
                                                                                            ({maybeResponses.length})
                                                                                        </Button> : ""
                                                                                }
                                                                                {
                                                                                    notAttendingResponses.length ?
                                                                                        <Button
                                                                                            onClick={() => setAttendances(notAttendingResponses)}
                                                                                            className="application-reject-button">
                                                                                            Not attending
                                                                                            ({notAttendingResponses.length})
                                                                                        </Button> : ""
                                                                                }
                                                                                {
                                                                                    attendingResponses.length ?
                                                                                        <Button
                                                                                            onClick={() => setAttendances(attendingResponses)}
                                                                                            className="application-accept-button">
                                                                                            Attending
                                                                                            ({attendingResponses.length})
                                                                                        </Button> : ""
                                                                                }
                                                                            </ButtonGroup>
                                                                        </div>

                                                                        {attendances ? attendances.map((attendance: any, index: number) => (
                                                                            <div key={index}>
                                                                                <ListItem
                                                                                    onClick={
                                                                                        () => handleViewAttendant(
                                                                                            attendance.profileId,
                                                                                            attendance.category,
                                                                                            event?.title
                                                                                        )
                                                                                    }
                                                                                    button
                                                                                    alignItems="flex-start">
                                                                                    <ListItemText
                                                                                        primary={
                                                                                            attendance.name
                                                                                        }
                                                                                        secondary={
                                                                                            <span
                                                                                                className="Drawer-timeago">
                                                                                                    {attendance.category}
                                                                                                </span>
                                                                                        }/>
                                                                                    <ListItemSecondaryAction>
                                                                                        {
                                                                                            attendance.category === 'attending' ?
                                                                                                <CheckCircleIcon
                                                                                                    className="application-accept-icon"/> :
                                                                                                attendance.category === 'not-attending' ?
                                                                                                    <CancelIcon
                                                                                                        className="application-reject-icon"/> :
                                                                                                    ""
                                                                                        }
                                                                                    </ListItemSecondaryAction>

                                                                                </ListItem>
                                                                                <Divider/>
                                                                            </div>
                                                                        )) : ""}
                                                                    </List>
                                                                </> :
                                                                <PleaseWait label={"Loading applicants..."}/>
                                                        }
                                                    </div>
                                                </XDrawer>

                                            </> : ""
                                    }
                                </Card>
                            </Box>
                        </>

                    ) : <PleaseWait label={"Please wait while we fetch the event details..."}/>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Event