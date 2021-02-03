import * as React from 'react'
import {useField} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {hasValue, IOption} from "./inputHelpers";
import {Chip} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";

interface IProps {
    label: string
    name: string
    helperText?: string
    options: IOption[]
    multiple?: boolean
    multiline?: boolean
    variant?: 'standard' | 'outlined' | 'filled'
    size?: 'small' | 'medium'
    margin?: 'none' | 'dense' | 'normal'
}

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

const XSelectInput = (props: IProps) => {

    const classes = useStyles()

    const {name, options, variant, margin = 'normal', helperText, ...rest} = props

    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined
    const showError = Boolean(error && meta.touched)
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    // const [chipData, setChipData] = useState<IOption[]>([])
    //
    // const handleDelete = (chipToDelete: IOption) => () => {
    //     setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id))
    // }

    return <FormControl error={showError} fullWidth variant={variant} margin={margin} size={props.size}>
        <InputLabel htmlFor={name} ref={inputLabel}>{rest.label}</InputLabel>
        <Select
            {...rest}
            value={meta.value || (props.multiple ? [] : '')}
            onChange={field.onChange}
            onBlur={field.onBlur}
            multiline={rest.multiline}
            fullWidth
            error={showError}
            input={<Input/>}
            multiple={rest.multiple}
            inputProps={{name}}
            labelWidth={labelWidth}
            renderValue={(selected) => (
                <div className={classes.chips}>
                    {
                        Array.isArray(selected) ? (
                                (selected as string[]).map((value, index) => (
                                    <Chip
                                        size={"small"}
                                        // onDelete={handleDelete}
                                        color={"secondary"}
                                        key={index}
                                        label={options?.filter(q => q.id === value)[0]?.name}
                                        className={classes.chip}
                                    />
                                ))
                            ) :
                            <Chip
                                size={"small"}
                                // onDelete={handleDelete}
                                color={"secondary"}
                                label={options?.filter(q => q.id === selected)[0]?.name}
                                className={classes.chip}
                            />
                    }
                </div>
            )}
            autoComplete="off"
        >
            <MenuItem disabled>
                {rest.multiple ? "Select one or more options" : "Select an option"}
            </MenuItem>
            {
                options ?
                    options.map((option, index) =>
                        <MenuItem key={index} value={option.id}>
                            {/*<Checkbox checked={meta.value.indexOf(option.id) > -1}/>*/}
                            <ListItemText primary={option.name}/>
                        </MenuItem>) :
                    ""
            }

        </Select>
        {
            helperText ? <FormHelperText>{helperText}</FormHelperText> :
                showError && <FormHelperText>{error}</FormHelperText>
        }
    </FormControl>
}

export default XSelectInput
