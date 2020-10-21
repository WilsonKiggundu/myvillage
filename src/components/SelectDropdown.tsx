import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(0),
            width: '100%',

        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface IProps {
    placeholder: string
    options?: any[]
    helperText?: string
}

export default function SelectDropdown(props: IProps) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };

    return (
        <FormControl variant="standard" className={classes.formControl}>
            <InputLabel id="select-filled-label">{props.placeholder || 'Select'}</InputLabel>
            <Select
                labelId="select-filled-label"
                id="select-filled"
                value={value}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>

                {
                    props.options ?
                        props.options.map(i => <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>) :
                        ""
                }

            </Select>

            {props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : ""}

        </FormControl>
    );
}
