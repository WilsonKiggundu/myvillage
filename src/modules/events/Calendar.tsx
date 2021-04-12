import React from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {Card, CardContent, Container} from "@material-ui/core";

interface IProps {
    events: []
}

const Calendar = ({events}: IProps) => {



    return (
        <Container disableGutters maxWidth={false}>
            <Card>
                <CardContent>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        events={events}
                        initialView="dayGridMonth"/>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Calendar