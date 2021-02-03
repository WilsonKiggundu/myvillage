import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {AutocompleteProps} from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import {useField} from "formik";
import {hasValue} from "./inputHelpers";
import {Variant} from "@material-ui/core/styles/createTypography";


const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

interface IProps {
    options: any[]
    label: string
    name: string
    helperText?: string
    variant?: 'outlined' | 'filled' | 'standard'
    multiple?: boolean
    setFieldValue: any
}

export default function XAutoComplete({options, helperText, setFieldValue, name, label, ...props}: IProps) {
    const classes = useStyles();

    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)

    return (
        <Autocomplete
            {...props}
            style={{width: '100%'}}
            options={options}
            classes={{
                option: classes.option,
            }}
            value={field.value}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={(e, value) => {
                setFieldValue(name, value);
            }}
            renderOption={(option) => (
                <>
                    {option.label} ({option.code}) +{option.phone}
                </>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...field}
                    value={field.value || ""}
                    label={label}
                    error={showError}
                    helperText={(showError && error) || helperText}
                    variant="standard"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}