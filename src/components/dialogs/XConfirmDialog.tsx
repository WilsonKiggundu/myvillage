import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
    title: string
    message: string
    open: boolean
    onContinue: () => void
    onClose: () => void
}

export default function XConfirmDialog(props: IProps) {
    const {title, message} = props

    const handleContinue = () => {
        props.onContinue()
    };

    const handleClose = () => {
        props.onClose()
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleContinue} color="primary" autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}
