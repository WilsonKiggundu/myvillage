import * as React from 'react'
import {useField} from 'formik';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import {hasValue} from "./inputHelpers";

interface IProps {
    name: string
    fontSize?: number
}

const XTextInput = ({name, fontSize, margin = 'normal', ...props}: TextFieldProps & IProps) => {
    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)
    return (
        <TextField
            {...field}
            {...props}
            margin={margin}
            fullWidth
            InputProps={{
                style: {
                    fontSize: fontSize ?? 12
                }
            }}
            error={showError}
            helperText={(showError && error) || props.helperText}
            value={field.value || ""}
            autoComplete="off"
        />
    )
}

export default XTextInput
