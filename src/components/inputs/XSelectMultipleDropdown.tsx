import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Chip} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(0),
            width: '100%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
    }),
);

type Variant = 'outlined' | 'filled' | 'standard'

interface IProps {
    variant?: Variant
    placeholder?: string
    options?: any[]
    helperText?: string
}

interface IChipData {
    key: number
    label: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 350
        }
    }
}

export default function XSelectMultipleDropdown(props: IProps) {
    const classes = useStyles();
    const [value, setValue] = React.useState<IChipData[]>([]);
    const [chipData, setChipData] = useState<IChipData[]>([])

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as IChipData[]);
    };

    const handleDelete = (chipToDelete: IChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
    }

    return (
        <FormControl variant={props.variant} className={classes.formControl}>
            {props.placeholder ? <InputLabel id="select-filled-label">{props.placeholder}</InputLabel> : ""}
            <Select
                labelId="select-filled-label"
                id="select-filled"
                value={value}
                onChange={handleChange}
                multiple
                name={"selected"}
                input={<Input/>}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as string[]).map((value, index) => (
                            <Chip size={"small"}
                                  onDelete={handleDelete}
                                  color={"secondary"}
                                  key={index}
                                  label={props.options?.filter(q => q.value === value)[0]?.label}
                                  className={classes.chip}/>
                        ))}
                    </div>
                )}
            >
                <MenuItem disabled>
                    Select one or more options
                </MenuItem>
                {
                    props.options ?
                        props.options.map((option, index) =>
                            <MenuItem key={index} value={option.value}>
                                <Checkbox checked={value.indexOf(option.value) > -1}/>
                                <ListItemText primary={option.label}/>
                            </MenuItem>) :
                        ""
                }

            </Select>

            {props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : ""}

        </FormControl>
    );
}
