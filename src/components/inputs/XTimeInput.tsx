import React from "react";
import {Field, FieldProps, useField} from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardTimePicker, KeyboardTimePickerProps, MuiPickersUtilsProvider,} from '@material-ui/pickers'
import {KeyboardDatePickerProps} from "@material-ui/pickers/DatePicker/DatePicker";
import {hasValue} from "./inputHelpers";

interface IProps {
    name: string
    label?: string
    variant?: 'outlined' | 'filled' | 'standard'
    placeholder?: string
    pickerVariant?: 'inline' | 'dialog' | 'static'
    disableFuture?: boolean
    disablePast?: boolean
}

type PickerProps = Omit<KeyboardTimePickerProps, 'variant' | 'inputVariant'>;

const XTimeInput = (props: IProps & Partial<PickerProps>) => {

    const {variant, helperText, pickerVariant, margin = 'normal', ...rest} = props
    const [field, meta, helpers] = useField({name: props.name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)

    function handleChange(time: any) {
        return helpers.setValue(time);
    }

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
            {...rest}
            // margin="normal"
            id="time-picker"
            fullWidth
            variant={pickerVariant}
            value={field.value}
            format={"HH:mm"}
            helperText={(showError && error) || helperText}
            error={Boolean(showError)}
            onChange={handleChange}
            onBlur={() => helpers.setTouched(true)}
            inputVariant={variant}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
        />
    </MuiPickersUtilsProvider>
}

export default XTimeInput
