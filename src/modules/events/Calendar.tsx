import React, {useState} from 'react';
import {Container, Grid} from "@material-ui/core";
import {addDays, format} from "date-fns";
import {XFab} from "../../components/buttons/XFab";
import AddIcon from "@material-ui/icons/Add";
import XDialog from "../../components/dialogs/XDialog";
import NewJob from "../jobs/forms/NewJob";
import NewEvent from "./forms/NewEvent";
import {Events} from "../../data/mockData";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import SendIcon from "@material-ui/icons/Send";
import EventIcon from '@material-ui/icons/Event';
import {MoreVert} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

export default () => {

    const events = Events

    const [openAddEventDialog, setOpenAddEventDialog] = useState<boolean>(false)

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
                maxWidth={"sm"}
                title={"Add an event"}
                open={openAddEventDialog}
                onClose={() => setOpenAddEventDialog(false)}>
                <NewEvent/>
            </XDialog>

            <Container maxWidth={"md"}>
                {events ? events.map((event, index) => (
                    <Box mb={2}>
                        <Card>
                            <CardContent>
                                <Typography
                                    component={"h6"}
                                    variant={"h6"}>
                                    {event.title}
                                </Typography>

                                <Typography component={"span"}>
                                    <small>{event.startDate} - {event.endDate} ({event.interval})</small>
                                </Typography>

                                <Box mt={2}>
                                    <Typography dangerouslySetInnerHTML={{__html: event.description}} component={"div"} />
                                </Box>

                                <Box mt={2}>
                                    <a href={event.videoLink}>
                                        Link to video call
                                    </a>
                                </Box>

                                <Box mt={4}>
                                    <Grid container justify={"flex-end"}>
                                        <Button color={"secondary"} variant={"contained"}>Attending</Button>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )) : ""}
            </Container>
        </>
    )
}