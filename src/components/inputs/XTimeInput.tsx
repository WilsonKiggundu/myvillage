import React from "react";
import {Field, FieldProps} from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers'

interface IProps {
    name: string
    label?: string
    placeholder?: string
}

const Component = ({field, form, placeholder, ...other}: FieldProps & IProps) => {
    const currentError = form.errors[field.name];

    function handleTouch() {
        return form.setFieldTouched(field.name, true, true);
    }

    function handleChange(date: any) {
        return form.setFieldValue(field.name, date, true);
    }

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
            {...other}
            margin="normal"
            id="time-picker"
            value={field.value}
            format={"HH:mm"}
            onChange={handleChange}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
        />

        {/*<KeyboardDateTimePicker*/}
        {/*    margin="normal"*/}
        {/*    KeyboardButtonProps={{*/}
        {/*        'aria-label': 'change time',*/}
        {/*    }}*/}
        {/*    placeholder={placeholder}*/}
        {/*    name={field.name}*/}
        {/*    value={field.value || null}*/}
        {/*    helperText={currentError}*/}
        {/*    error={Boolean(currentError)}*/}
        {/*    onClose={handleTouch}*/}
        {/*    onChange={handleChange}*/}
        {/*    fullWidth*/}
        {/*    {...other}*/}
        {/*    autoComplete="off"*/}
        {/*/>*/}
    </MuiPickersUtilsProvider>
}

const XTimeInput = (props: IProps) => {
    return (
        <Field
            name={props.name}
            label={props.label}
            component={Component}
        />
    )
}

export default XTimeInput
