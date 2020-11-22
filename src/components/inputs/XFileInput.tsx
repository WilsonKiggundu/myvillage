import * as React from 'react'
import {useField} from 'formik';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import {hasValue} from "./inputHelpers";
import {Button, createStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import {createRef, useRef, useState} from "react";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

interface IProps {
    name: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },

        input: {
            display: "none",
            cursor: 'pointer',
            opacity: 0,
            zIndex: theme.zIndex.modal - 1
        },

        label: {
            cursor: 'pointer',
            color: blue[600],
            fontSize: '0.9rem',
            display: "block",
            textTransform: 'capitalize'
        }
    }),
);

const XFileInput = ({name, ...props}: IProps) => {
    const [field, meta] = useField({name});
    const error = hasValue(meta.error) ? meta.error : undefined

    const inputRef = createRef<any>()
    const [files, setFiles] = useState<any>([])

    const classes = useStyles()

    const handleClick = () => {
        inputRef.current.click()
    }

    const handleFileSelect = (event: any)  => {
        const uploads = event.target.files
        setFiles([...uploads])
    }

    return (
        <Box mt={1}>
            <input
                ref={inputRef}
                className={classes.input}
                {...field}
                type={"file"}
                multiple
                {...props}
                value={field.value || ""}
                autoComplete="off"
                onChange={handleFileSelect}
            />

            <Box>
                <a onClick={handleClick} className={classes.label}>
                    Add attachments
                </a>
            </Box>

            <Box mt={1}>
                {files ? files.map((file: any, index: number) => (
                    <Chip key={index}
                          label={file.name}
                          size={"small"}
                          style={{maxWidth: 120, marginRight: 2, marginBottom: 2}} />)) : ""}
            </Box>

        </Box>
    )
}

export default XFileInput
