/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {IOption} from "./inputHelpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

interface IProps {
    placeholder?: string
    label: string
    data: IOption[]
}

export default function XSelectInputCheckbox({placeholder, label, data}: IProps) {
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={data}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            freeSolo
            renderOption={(option, {selected}) => (
                <>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                    />
                    {option.name}
                </>
            )}
            style={{width: '100%'}}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label={label} placeholder={placeholder}/>
            )}
        />
    );
}
