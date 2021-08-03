import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Divider, useTheme} from "@material-ui/core";
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
import VideoCallIcon from '@material-ui/icons/VideoCall';
import EventAttachments from "./EventAttachments";
import {getWithoutLoginAsync, makeUrl, postAsync} from "../../utils/ajax";
import {Endpoints} from "../../services/Endpoints";
import {IPerson} from "../profiles/people/IPerson";
import SocialShare from "../../components/SocialShare";
import {isBefore} from "date-fns";
import {handleLogin} from "../../utils/authHelpers";
import Toast from "../../utils/Toast";

import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import '@fortawesome/free-solid-svg-icons'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import {XFab} from "../../components/buttons/XFab";
import {XLoginSnackbar} from "../../components/XLoginSnackbar";
import XDialog from "../../components/dialogs/XDialog";
import RateEvent from "./forms/RateEvent";


const Event = ({match}: any) => {

    const user = useSelector(userSelector)
    const id = parseInt(match.params.id, 10)
    const [event, setEvent] = useState<any>({})
    const [eventDetails, setEventDetails] = useState<string>('')
    const [isPastEvent, setIsPastEvent] = useState<boolean>(false)
    const [isEventOwner, setIsEventOwner] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const [openRateEventDialog, setOpenRateEventDialog] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {

        (async () => {
            try {
                const response: any = await getEventById(id)

                const event = response.body

                event.type = (event.type === "physical" ? "Physical Event" : event.type)
                setIsPastEvent(isBefore(new Date(event.endDateTime), new Date()))
                setIsEventOwner(event.createdBy === user?.profile.sub)

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

    const handleRegister = async (eventId: any, profileId: string) => {

        setSubmitting(true)

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

    const handleCreate = () => {
        if (user) {
            window.location.replace(Urls.createEvent)
        } else {
            setOpenSnackbar(true)
        }
    }

    return (
        <Container disableGutters={isMobile} maxWidth={"md"}>
            <Grid justify={"center"} container spacing={2}>
                <Grid item xs={12}>
                    {event ? (
                        <div className="event-canvas">
                            <Grid container justify={"space-between"} spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <h1 className="event-title">{event.title}</h1>
                                    <label className="event-label">{event.type}</label>
                                </Grid>
                                <Grid style={{textAlign: isMobile ? "left" : "right"}} item xs={12} md={4}>
                                    {
                                        isPastEvent ?
                                            isEventOwner &&
                                            <>
                                                <Button onClick={() => setOpenRateEventDialog(true)}
                                                        disableElevation variant={"contained"} color={"secondary"}>
                                                    Rate this event
                                                </Button>
                                            </>
                                            :
                                            <Button onClick={() => handleRegister(event.id, user.profile.sub)}
                                                    disableElevation variant={"contained"}
                                                    disabled={submitting}
                                                    color={"secondary"}>
                                                {submitting ? <CircularProgress size={20}/> : "Register to attend"}
                                            </Button>
                                    }
                                </Grid>
                            </Grid>

                            <Box mb={4} mt={4}>
                                <Grid spacing={2} container justify={"flex-start"}>
                                    <Grid item xs={12} sm={6} md={4}>

                                        <div className="event-icon">
                                            {event.location === "On Zoom" ?
                                                <LocationOn style={{fontSize: 50}}/> :
                                                <VideoCallIcon style={{fontSize: 50}}/>
                                            }

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

                            {!isPastEvent && <Box mt={4} mb={4}>
                                <AddToCalendar
                                    listItems={
                                        [
                                            {outlook: 'Outlook'},
                                            {outlookcom: 'Outlook.com'},
                                            {apple: 'Apple Calendar'},
                                            // { yahoo: 'Yahoo' },
                                            {google: 'Google'}
                                        ]
                                    }
                                    displayItemIcons={false}
                                    buttonTemplate={{
                                        textOnly: 'none'
                                    }}
                                    event={{
                                        title: event.title,
                                        description: eventDetails,
                                        location: event.location,
                                        startTime: event.startDateTime,
                                        endTime: event.endDateTime
                                    }}/>
                            </Box>}

                            <Box>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: event.details
                                    }}
                                />

                                <EventAttachments uploads={event.uploads}/>

                                <Box mt={2} mb={2}>
                                    <Divider/>
                                </Box>
                                {/*<Box mt={2} mb={2}>*/}
                                {/*    <Button onClick={() => setOpenRateEventDialog(true)}*/}
                                {/*            disableElevation variant={"contained"} color={""}>*/}
                                {/*        Update*/}
                                {/*    </Button>*/}
                                {/*    <Button onClick={() => setOpenRateEventDialog(true)}*/}
                                {/*            disableElevation variant={"contained"} color={"secondary"}>*/}
                                {/*        Delete*/}
                                {/*    </Button>*/}
                                {/*</Box>*/}

                                {event.attendances?.map((attendant: any, index: number) => {
                                    return <p>{attendant.profileId}</p>
                                })}


                                {event.webinar && <Box mt={4} mb={4}>
                                    <Button disableElevation variant={"contained"}
                                            color={"primary"}
                                            href={event.webinar.startUrl}
                                            target={"_blank"}>
                                        Join The Webinar
                                    </Button>
                                </Box>}


                                <SocialShare
                                    title={`#UpcomingEvent - ${longDate(event.startDateTime)}`}
                                    description={eventDetails.substr(0, 100)}/>

                            </Box>
                        </div>

                    ) : <PleaseWait label={"Please wait while we fetch the event details..."}/>}
                </Grid>
            </Grid>

            <XDialog title={"Rate the event"}
                     maxWidth={"sm"}
                     onClose={() => setOpenRateEventDialog(false)}
                     open={openRateEventDialog}>
                <RateEvent
                    onClose={() => setOpenRateEventDialog(false)}
                    event={event}/>
            </XDialog>

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

export default Event