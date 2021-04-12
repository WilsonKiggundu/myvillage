import React from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import {Container} from "@material-ui/core";

const Calendar = () => {
    return (
        <Container maxWidth={"lg"}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                events={[
                    {
                        id: '1',
                        title: 'my event',
                        start: '2021-04-13',
                        end: '2021-04-15',
                        description: 'Some events that will blow your mind away.'
                    }
                ]}
                initialView="dayGridMonth" />
        </Container>
    )
}

export default Calendar