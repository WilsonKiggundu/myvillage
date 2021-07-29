import {IEvent} from "../../interfaces/IEvent";
import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useSelector} from "react-redux";
import {PleaseWait} from "../../components/PleaseWait";
import Container from "@material-ui/core/Container";
import {Urls} from "../../routes/Urls";
import {getEventById} from "./redux/eventsEndpoints";
import {userSelector} from "../../data/coreSelectors";
import userManager from "../../utils/userManager";
import {Anchor} from "../../components/drawer/XDrawer";
import {longDate, timeFormat} from "../../utils/dateHelpers";
import {useHistory} from "react-router-dom";
import EventIcon from '@material-ui/icons/Event'

import './event-card.css'
import {LocationOn} from "@material-ui/icons";
import EventAttachments from "./EventAttachments";
import {getWithoutLoginAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPerson} from "../profiles/people/IPerson";
import SocialShare from "../../components/SocialShare";
import {isBefore} from "date-fns";
import {handleLogin, handleSignup} from "../../utils/authHelpers";
import Toast from "../../utils/Toast";

const Event = ({match}: any) => {

    const history = useHistory()
    const user = useSelector(userSelector)
    const id = parseInt(match.params.id, 10)
    const [event, setEvent] = useState<IEvent | undefined>(undefined)
    const [eventDetails, setEventDetails] = useState<string>('')
    const [isPastEvent, setIsPastEvent] = useState<boolean>(false)

    const [submitting, setSubmitting] = useState<boolean>(false)

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

                event.type = (event.type === "physical" ? "Physical Event" : event.type).toUpperCase()
                setIsPastEvent(isBefore(event.endDateTime, new Date()))

                setEvent(event)

                let div = document.createElement("div")
                div.innerHTML = event?.details

                const eventDetails = div.textContent || div.innerText || ""
                setEventDetails(eventDetails)

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

                    if (person) {
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

    const handleRegister = async (eventId: any, profileId: string) => {

        // setSubmitting(true)

        if (!user) await handleLogin()

        try {
            const endpoint = `${Endpoints.events.api}/${eventId}/register/${profileId}`
            const url = makeUrl("Profiles", endpoint)

            await postAsync(url, {})

            setSubmitting(false)
            Toast.success("Your registration has been successful")

        } catch (error) {
            Toast.error(error.toString())
        } finally {

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
                        <div className="event-canvas">
                            <Grid container justify={"space-between"} spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <h1 className="event-title">{event.title}</h1>
                                    <label>{event.type}</label>
                                </Grid>
                                <Grid style={{textAlign: "right"}} item xs={12} md={4}>
                                    {
                                        isPastEvent ?
                                            <Button disableElevation variant={"contained"} color={"secondary"}>
                                                Rate this event
                                            </Button> :
                                            <Button onClick={() => handleRegister(event.id, user.profile.sub)}
                                                    disableElevation variant={"contained"}
                                                    disabled={submitting}
                                                    color={"secondary"}>
                                                {submitting ? <CircularProgress size={20} /> : "Register to attend" }
                                            </Button>
                                    }
                                </Grid>
                            </Grid>

                            <Box mb={4} mt={4}>
                                <Grid spacing={2} container justify={"flex-start"}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="event-icon">
                                            <LocationOn color={"secondary"} style={{fontSize: 50}}/>
                                        </div>
                                        <strong>Location</strong><br/>
                                        <div>{event.location}</div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="event-icon">
                                            <EventIcon style={{fontSize: 50}}/>
                                        </div>
                                        <strong>Starts on</strong><br/>
                                        {longDate(event.startDateTime)}<br/>
                                        <span className="event-time">{timeFormat(event.startDateTime)}</span>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="event-icon">
                                            <EventIcon style={{fontSize: 50}}/>
                                        </div>
                                        <strong>Ends on</strong><br/>
                                        {longDate(event.endDateTime)}<br/>
                                        <span className="event-time">{timeFormat(event.endDateTime)}</span>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <h5>Event details / Agenda</h5>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: event.details
                                    }}
                                />

                                <EventAttachments uploads={event.uploads}/>

                                {/*<Grid*/}
                                {/*    className="featured-event-button-container"*/}
                                {/*    container*/}
                                {/*    spacing={2}*/}
                                {/*    justify={"flex-start"}>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <EventActionButtons*/}
                                {/*            iconSize={"lg"}*/}
                                {/*            bgColor={"#ffffff"}*/}
                                {/*            showLabels*/}
                                {/*            id={event.id}/>*/}
                                {/*    </Grid>*/}
                                {/*</Grid>*/}

                                <Divider/>

                                {event.attendances?.map((attendant: any, index: number) => {
                                    return <p>{attendant.profileId}</p>
                                })}

                                <SocialShare
                                    title={`#UpcomingEvent - ${longDate(event.startDateTime)}`}
                                    description={eventDetails.substr(0, 100)}/>

                                {/*{*/}
                                {/*    event.attendances?.length ?*/}
                                {/*        <>*/}
                                {/*            <Divider/>*/}
                                {/*            <Grid container justify={"center"}>*/}
                                {/*                <Grid item>*/}
                                {/*                    <Button*/}
                                {/*                        onClick={() => toggleDrawer("right", true)}*/}
                                {/*                        color={"default"}*/}
                                {/*                        variant={"outlined"}>*/}
                                {/*                        {event.attendances?.length} responses*/}
                                {/*                    </Button>*/}
                                {/*                </Grid>*/}
                                {/*            </Grid>*/}

                                {/*            /!*<XDrawer*!/*/}
                                {/*            /!*    onClose={() => toggleDrawer("right", false)}*!/*/}
                                {/*            /!*    open={openDrawer}*!/*/}
                                {/*            /!*    anchor={drawerAnchor}>*!/*/}
                                {/*            /!*    <div className="Drawer">*!/*/}
                                {/*            /!*        {*!/*/}
                                {/*            /!*            attendances ?*!/*/}
                                {/*            /!*                <>*!/*/}

                                {/*            /!*                    <List*!/*/}
                                {/*            /!*                        subheader={*!/*/}
                                {/*            /!*                            <ListSubheader*!/*/}
                                {/*            /!*                                className="Drawer-subheader">*!/*/}
                                {/*            /!*                                Attendance*!/*/}
                                {/*            /!*                            </ListSubheader>*!/*/}
                                {/*            /!*                        }>*!/*/}

                                {/*            /!*                        <div*!/*/}
                                {/*            /!*                            className="application-button-group">*!/*/}
                                {/*            /!*                            <ButtonGroup color={"default"}>*!/*/}
                                {/*            /!*                                <Button*!/*/}
                                {/*            /!*                                    onClick={() => setAttendances(allResponses)}>*!/*/}
                                {/*            /!*                                    All*!/*/}
                                {/*            /!*                                    ({allResponses.length})*!/*/}
                                {/*            /!*                                </Button>*!/*/}
                                {/*            /!*                                {*!/*/}
                                {/*            /!*                                    maybeResponses.length ?*!/*/}
                                {/*            /!*                                        <Button*!/*/}
                                {/*            /!*                                            onClick={() => setAttendances(maybeResponses)}>*!/*/}
                                {/*            /!*                                            May be*!/*/}
                                {/*            /!*                                            ({maybeResponses.length})*!/*/}
                                {/*            /!*                                        </Button> : ""*!/*/}
                                {/*            /!*                                }*!/*/}
                                {/*            /!*                                {*!/*/}
                                {/*            /!*                                    notAttendingResponses.length ?*!/*/}
                                {/*            /!*                                        <Button*!/*/}
                                {/*            /!*                                            onClick={() => setAttendances(notAttendingResponses)}*!/*/}
                                {/*            /!*                                            className="application-reject-button">*!/*/}
                                {/*            /!*                                            Not attending*!/*/}
                                {/*            /!*                                            ({notAttendingResponses.length})*!/*/}
                                {/*            /!*                                        </Button> : ""*!/*/}
                                {/*            /!*                                }*!/*/}
                                {/*            /!*                                {*!/*/}
                                {/*            /!*                                    attendingResponses.length ?*!/*/}
                                {/*            /!*                                        <Button*!/*/}
                                {/*            /!*                                            onClick={() => setAttendances(attendingResponses)}*!/*/}
                                {/*            /!*                                            className="application-accept-button">*!/*/}
                                {/*            /!*                                            Attending*!/*/}
                                {/*            /!*                                            ({attendingResponses.length})*!/*/}
                                {/*            /!*                                        </Button> : ""*!/*/}
                                {/*            /!*                                }*!/*/}
                                {/*            /!*                            </ButtonGroup>*!/*/}
                                {/*            /!*                        </div>*!/*/}

                                {/*            /!*                        {attendances ? attendances.map((attendance: any, index: number) => (*!/*/}
                                {/*            /!*                            <div key={index}>*!/*/}
                                {/*            /!*                                <ListItem*!/*/}
                                {/*            /!*                                    onClick={*!/*/}
                                {/*            /!*                                        () => handleViewAttendant(*!/*/}
                                {/*            /!*                                            attendance.profileId,*!/*/}
                                {/*            /!*                                            attendance.category,*!/*/}
                                {/*            /!*                                            event?.title*!/*/}
                                {/*            /!*                                        )*!/*/}
                                {/*            /!*                                    }*!/*/}
                                {/*            /!*                                    button*!/*/}
                                {/*            /!*                                    alignItems="flex-start">*!/*/}
                                {/*            /!*                                    <ListItemText*!/*/}
                                {/*            /!*                                        primary={*!/*/}
                                {/*            /!*                                            attendance.name*!/*/}
                                {/*            /!*                                        }*!/*/}
                                {/*            /!*                                        secondary={*!/*/}
                                {/*            /!*                                            <span*!/*/}
                                {/*            /!*                                                className="Drawer-timeago">*!/*/}
                                {/*            /!*                                                        {attendance.category}*!/*/}
                                {/*            /!*                                                    </span>*!/*/}
                                {/*            /!*                                        }/>*!/*/}
                                {/*            /!*                                    <ListItemSecondaryAction>*!/*/}
                                {/*            /!*                                        {*!/*/}
                                {/*            /!*                                            attendance.category === 'attending' ?*!/*/}
                                {/*            /!*                                                <CheckCircleIcon*!/*/}
                                {/*            /!*                                                    className="application-accept-icon"/> :*!/*/}
                                {/*            /!*                                                attendance.category === 'not-attending' ?*!/*/}
                                {/*            /!*                                                    <CancelIcon*!/*/}
                                {/*            /!*                                                        className="application-reject-icon"/> :*!/*/}
                                {/*            /!*                                                    ""*!/*/}
                                {/*            /!*                                        }*!/*/}
                                {/*            /!*                                    </ListItemSecondaryAction>*!/*/}

                                {/*            /!*                                </ListItem>*!/*/}
                                {/*            /!*                                <Divider/>*!/*/}
                                {/*            /!*                            </div>*!/*/}
                                {/*            /!*                        )) : ""}*!/*/}
                                {/*            /!*                    </List>*!/*/}
                                {/*            /!*                </> :*!/*/}
                                {/*            /!*                <PleaseWait label={"Loading applicants..."}/>*!/*/}
                                {/*            /!*        }*!/*/}
                                {/*            /!*    </div>*!/*/}
                                {/*            /!*</XDrawer>*!/*/}

                                {/*        </> : ""*/}
                                {/*}*/}
                            </Box>
                        </div>

                    ) : <PleaseWait label={"Please wait while we fetch the event details..."}/>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Event