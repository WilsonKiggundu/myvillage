import {IEvent} from "../../interfaces/IEvent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import {format} from "date-fns";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import PinDropIcon from "@material-ui/icons/PinDrop";
import RepeatIcon from "@material-ui/icons/Repeat";
import React from "react";
import {globalStyles} from "../../theme/styles";

interface IProps {
    event: IEvent
}

const EventCard = ({event}: IProps) => {

    const classes = globalStyles()

    return (
        <Box mb={2}>
            <Card>
                <CardContent>

                    <Box mt={2}>
                        <Grid container>
                            <Grid item xs={1}>
                                <AccessTimeIcon/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography
                                    component={"h6"}>
                                    {event.title}
                                </Typography>
                                <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                    <small style={{color: grey[600]}}>
                                        {format(new Date(event.startDateTime), "eeee, d MMMM")} .
                                        {format(new Date(event.startDateTime), "HH:mm")} -
                                        {format(new Date(event.endDateTime), "HH:mm z")}
                                    </small>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {event.conferenceUrl ?
                        <Box mt={2}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <VideoCallIcon style={{color: green[700]}}/>
                                </Grid>
                                <Grid item xs={11}>

                                    <Button variant={"contained"}
                                            className={classes.flat}
                                            color={"secondary"}
                                            href={event.conferenceUrl}>
                                        Join on Video Call
                                    </Button><br/>
                                    <small>{event.conferenceUrl}</small>

                                </Grid>
                            </Grid>
                        </Box> : ""
                    }

                    {event.location ?
                        <Box mt={2}>
                            <Grid container style={{color: grey[700]}}>
                                <Grid item xs={1}>
                                    <PinDropIcon/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography style={{whiteSpace: 'pre-line', fontSize: '0.95rem'}}
                                                component={"div"}>
                                        {event.location}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box> : ""
                    }

                    {event.interval ? <Box mt={2}>
                        <Grid container>
                            <Grid item xs={1}>
                                <RepeatIcon/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>
                                    {event.interval}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box> : ""}

                    <Box mt={2}>
                        <Grid container>
                            <Grid item xs={1}>

                            </Grid>
                            <Grid item xs={11}>
                                <Typography style={{whiteSpace: 'pre-line', fontSize: '0.9rem', color: grey[700]}}
                                            component={"div"}>
                                    {event.details}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/*<Box mt={4}>*/}
                    {/*    <Grid container justify={"flex-end"}>*/}
                    {/*        <Button color={"secondary"} variant={"contained"}>Attending</Button>*/}
                    {/*    </Grid>*/}
                    {/*</Box>*/}
                </CardContent>
            </Card>
        </Box>
    )
}

export default EventCard