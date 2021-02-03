/* eslint-disable no-use-before-define */
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {IOption} from "./inputHelpers";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {useField, useFormikContext} from "formik";
import {FormControl} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

const filter = createFilterOptions<IOption>();

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

type TextFieldVariant = 'standard' | 'filled' | 'outlined'

interface IProps {
    label: string
    name: string
    helperText?: string
    options: any[]
    multiple?: boolean
    multiline?: boolean
    variant: any
    size?: 'small' | 'medium'
    margin?: 'none' | 'dense' | 'normal'
    dialogTitle?: string
    dialogSubtitle?: string
    allowAddNew?: boolean
    defaultValue?: any
}

export default function XSelectInputCreatable(props: IProps) {
    const [open, toggleOpen] = useState(false);

    const {name, options, helperText, label, ...rest} = props
    const {isSubmitting} = useFormikContext()
    const fieldProps = useField(name)
    const meta = fieldProps[1]
    const helpers = fieldProps[2]

    const showError = meta.touched && !!meta.error

    const handleClose = () => {
        setDialogValue('');
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = useState<string | null>(null);

    const handleSubmit = () => {
        handleClose();
    };

    return (
        <FormControl error={showError} fullWidth>
            <Autocomplete
                disabled={isSubmitting}
                onBlur={() => helpers.setTouched(true)}
                multiple={rest.multiple}
                disableCloseOnSelect={rest.multiple}
                getOptionLabel={(option: IOption) => option.name}
                onChange={(_, newValue: any) => {
                    helpers.setValue(newValue || '')
                }}
                renderOption={(option, {selected}) => (
                    <>
                        {rest.multiple
                            ? <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{marginRight: 8}}
                                checked={selected}
                            /> : ""
                        }
                        {option.name}
                    </>
                )}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params) as any[];

                    if (rest.allowAddNew) {
                        if (params.inputValue !== '') {
                            filtered.push({
                                name: params.inputValue,
                            });
                        }
                    }

                    return filtered;
                }}
                options={options}
                defaultValue={props.defaultValue}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                style={{width: '100%'}}
                freeSolo={rest.allowAddNew}
                renderInput={(params) => (
                    <TextField error={showError} {...params} label={label} variant={props.variant}/>
                )}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">{rest.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {rest.dialogSubtitle}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            style={{width: '100%'}}
                            value={dialogValue}
                            onChange={
                                (event) => setDialogValue(event.target.value)
                            }
                            label="Option"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {
                helperText ? <FormHelperText>{helperText}</FormHelperText> :
                    showError && <FormHelperText>{meta.error}</FormHelperText>
            }

        </FormControl>
    );
}
