import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {FormLabel} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


interface IProps {
    label: string
    helperText?: string
    defaultValue?: string
    disableFuture?: boolean
    disablePast?: boolean
}

export default function CustomDatePicker(props: IProps) {

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date()
    )

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormLabel style={{marginBottom: 5}}>{props.label}</FormLabel>
            <Grid container justify="flex-start">
                {/*<KeyboardDatePicker*/}
                {/*    disableToolbar*/}
                {/*    value={selectedDate}*/}
                {/*    onChange={handleDateChange}*/}
                {/*/>*/}
                <TextField
                    helperText={props.helperText}
                    id="date"
                    type="date"
                    InputLabelProps={{
                        shrink: false,
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
