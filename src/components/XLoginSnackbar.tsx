import {Alert} from "@material-ui/lab";
import {Button, Snackbar} from "@material-ui/core";
import {handleLogin} from "../utils/authHelpers";
import React from "react";

interface IProps {
    open: boolean
    onClose: () => void
}

export const XLoginSnackbar = ({open, onClose}: IProps) => {
    return (
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={open} autoHideDuration={6000}
            onClose={onClose}>
            <Alert onClose={onClose} severity="warning">
                You need to login. &nbsp;&nbsp;
                <Button onClick={handleLogin} size={"small"} variant={"outlined"} color={"secondary"}>
                    Continue to login
                </Button>
            </Alert>
        </Snackbar>
    )
}