import React from "react";
import {useField} from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';

interface IProps {
    name: string
    label: string
}

const XCheckBoxInput = (props: IProps & CheckboxProps) => {
    const [field] = useField({name: props.name});
    return <FormControlLabel
        label={props.label}
        control={
            <Checkbox
                checked={field.value||false}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={props.name}
                color="secondary"
            />
        }
    />
}
export default XCheckBoxInput
