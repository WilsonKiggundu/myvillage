import * as React from 'react'
import {useField} from 'formik';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import {hasValue} from "./inputHelpers";

interface IProps {
    name: string
    rowsMax?: number
    rows?: number
}

const XTextAreaInput = ({name, margin = 'normal', ...props}: TextFieldProps & IProps) => {
    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)
    return (
        <TextField
            {...field}
            {...props}
            fullWidth
            error={showError}
            helperText={(showError && error) || props.helperText}
            value={field.value || ""}
            margin={margin}
            multiline
            autoComplete="off"
        />
    )
}

export default XTextAreaInput
