import * as React from 'react'
import {createRef, useState} from 'react'
import {useField} from 'formik';
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import blue from "@material-ui/core/colors/blue";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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
    const [field] = useField({name});

    const inputRef = createRef<any>()
    const [files, setFiles] = useState<any>([])

    const classes = useStyles()

    const handleClick = () => {
        inputRef.current.click()
    }

    const handleFileSelect = (event: any) => {
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
                <Button onClick={handleClick} className={classes.label}>
                    Add attachments
                </Button>
            </Box>

            <Box mt={1}>
                {files ? files.map((file: any, index: number) => (
                    <Chip key={index}
                          label={file.name}
                          size={"small"}
                          style={{maxWidth: 120, marginRight: 2, marginBottom: 2}}/>)) : ""}
            </Box>

        </Box>
    )
}

export default XFileInput
