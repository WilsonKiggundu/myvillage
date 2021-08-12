import React from "react";
import {useField} from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';

interface IProps {
    name: string
    value?: any
    label: string
    onChange?: () => void
}

const XCheckBoxInput = ({...props}: IProps) => {
    const [field] = useField(props);

    return <FormControlLabel
        label={props.label}
        control={
            <Checkbox
                checked={field.value || false}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                color="secondary"
            />
        }
    />
}
export default XCheckBoxInput
