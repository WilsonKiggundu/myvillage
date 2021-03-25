import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {FormControl} from "@material-ui/core";
import {useField} from "formik";
import {getAsync} from "../../utils/ajax";
import FormHelperText from "@material-ui/core/FormHelperText";
import Avatar from "@material-ui/core/Avatar";
import {globalStyles} from "../../theme/styles";
import Box from "@material-ui/core/Box";

interface IProps {
    placeholder?: string
    label?: string
    name: string
    helperText?: string
    multiple?: boolean
    multiline?: boolean
    variant?: any
    size?: 'small' | 'medium'
    margin?: 'none' | 'dense' | 'normal',
    data: {
        field?: string,
        endpoint: string
        params?: {}
        label: string
        avatar?: string
    }
}

const XSelectInputAsync = ({data, ...props}: IProps) => {
    const classes = globalStyles()
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const loading = open && options.length === 0;

    const {name, helperText, label} = props
    // const {isSubmitting} = useFormikContext()
    const fieldProps = useField(name)
    const meta = fieldProps[1]
    const helpers = fieldProps[2]

    const showError = meta.touched && !!meta.error

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response: any = await getAsync(data.endpoint, data.params);

            if (active) {

                const fieldData = data.field ? response.body[data.field] : response.body

                setOptions(fieldData.map((item: any) => (
                    {
                        id: item.id,
                        name: item[data.label],
                        avatar: data.avatar ? item[data.avatar] : ''
                    }
                )));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <FormControl fullWidth>
            <Autocomplete
                size={props.size}
                id="asynchronous-demo"
                style={{width: '100%'}}
                // placeholder={props.placeholder}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                filterOptions={(x) => x}
                includeInputInList
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(_, newValue: any) => {
                    helpers.setValue(newValue.id || '')
                }}
                filterSelectedOptions
                // getOptionSelected={(option, value) => option.name === value.name}
                renderOption={(option: any) =>
                    <>
                        {option.avatar &&
                            <Avatar className={classes.smallAvatar} src={option.avatar}>
                                {option.name[0].toUpperCase()}
                            </Avatar>
                        }

                        <Box ml={option.avatar ? 2 : ''}>{option.name}</Box>
                    </>
                }
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        size={props.size}
                        {...params}
                        placeholder={props.placeholder}
                        // label={props.label}
                        variant={props.variant}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />

            {
                helperText ? <FormHelperText>{helperText}</FormHelperText> :
                    showError && <FormHelperText>{meta.error}</FormHelperText>
            }
        </FormControl>
    );
}

export default XSelectInputAsync
