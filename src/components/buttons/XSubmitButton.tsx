import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core/styles";
import {Button, ButtonProps} from "@material-ui/core";
import React from "react";

interface IProps {
    label: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flat: {
            boxShadow: "none",
            borderRadius: 5
        }
    }),
);

export default function ({name, ...props}: ButtonProps & IProps) {
    const classes = useStyles()

    return (
        <Button
            type={"button"}
            className={classes.flat}
            {...props}
            onClick={props.onClick}
            variant={"contained"}>
            {props.label}
        </Button>
    )
}