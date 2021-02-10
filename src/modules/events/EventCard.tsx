import {IEvent} from "../../interfaces/IEvent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import {format} from "date-fns";
import Button from "@material-ui/core/Button";
import React from "react";
import {globalStyles} from "../../theme/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";

interface IProps {
    event: IEvent
}

const EventCard = ({event}: IProps) => {

    const classes = globalStyles()

    return (
        <Box mb={1}>
            <Card>
                <CardContent style={{padding: 30}}>

                    <Box mb={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    variant={"h4"}
                                    component={"h4"}>
                                    <strong>{event.title}</strong>
                                </Typography>
                                <Typography component={"div"}>
                                    <small style={{color: grey[600]}}>
                                        {format(Date.parse(event.startDateTime.replace(/ /g, "T")), "eeee, d MMMM")} .
                                        {format(Date.parse(event.startDateTime.replace(/ /g, "T")), "HH:mm")} -
                                        {format(Date.parse(event.endDateTime.replace(/ /g, "T")), "HH:mm z")}
                                    </small>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {event.conferenceUrl ?
                        <Box mb={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button variant={"contained"}
                                            className={classes.flat}
                                            color={"inherit"}
                                            href={event.conferenceUrl}>
                                        Join on Video Call
                                    </Button><br/>
                                    <small style={{
                                        wordWrap: "break-word",
                                        wordBreak: "break-all",
                                        fontSize: '0.75rem'
                                    }}>{event.conferenceUrl}</small>

                                </Grid>
                            </Grid>
                        </Box> : ""
                    }

                    {event.location ?
                        <Box mb={4}>
                            <Grid container style={{color: grey[700]}}>
                                <Grid item>
                                    <LocationOnIcon/>
                                </Grid>
                                <Grid style={{marginTop: 3, marginLeft: 10}} item>
                                    {event.location}
                                </Grid>
                            </Grid>
                        </Box> : ""
                    }

                    {/*{event.interval ? <Box mt={2}>*/}
                    {/*    <Grid container>*/}
                    {/*        <Grid item xs={1} style={{textAlign: 'center'}}>*/}
                    {/*            <RepeatIcon/>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item xs={11}>*/}
                    {/*            <Typography style={{whiteSpace: 'pre-line'}} component={"div"}>*/}
                    {/*                {event.interval}*/}
                    {/*            </Typography>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Box> : ""}*/}

                    <Box mb={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box mb={2}>
                                    <strong>Description</strong>
                                </Box>
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