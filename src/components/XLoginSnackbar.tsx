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
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={open} autoHideDuration={6000}
            onClose={onClose}>
            <Alert onClose={onClose} icon={false} severity="error">
                <p>You need to login to continue.</p>
                <Button
                    onClick={handleLogin}
                    size={"small"}
                    variant={"contained"}
                    disableElevation
                    color={"primary"}>
                    Continue to login
                </Button>
            </Alert>
        </Snackbar>
    )
}