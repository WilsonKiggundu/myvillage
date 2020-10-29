import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import withWidth from "@material-ui/core/withWidth";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export interface IProps {
    minWidth?: any
    dividers?: boolean
    contentText?: string
    submitButtonLabel?: string
    title?: string;
    children?: any;
    open: boolean;
    onSubmit: () => void
    onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

function CreateDialog(props: IProps){
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

    const dialogProps = {
        fullScreen: isMobile
    }

    const classes = useStyles()

    const handleSubmit = () => {
        props.onSubmit()
    };

    const handleClose = () => {
        props.onClose()
    };

    return (
        <Dialog {...dialogProps}
                scroll={"paper"}
                fullWidth={true}
                maxWidth={"md"}
                onClose={() => props.onClose}
                aria-labelledby="dialog-title"
                open={props.open}>
            {!dialogProps.fullScreen ? (
                <>
                    <DialogTitle id="dialog-title">{props.title}</DialogTitle>
                    <DialogContent dividers={true}>
                        { props.contentText ? <DialogContentText>{props.contentText}</DialogContentText> : "" }
                        { props.children }
                    </DialogContent>
                    <DialogActions>
                        <Button style={{textTransform: "uppercase"}}
                                onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button style={{textTransform: "uppercase"}}
                                onClick={handleSubmit}
                                color="primary">
                            {props.submitButtonLabel}
                        </Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {props.title}
                            </Typography>
                            <Button style={{textTransform: "uppercase"}}
                                    variant={"outlined"}
                                    autoFocus
                                    color="inherit"
                                    onClick={handleSubmit}>
                                {props.submitButtonLabel}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        {props.children}
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
}

export default withWidth()(CreateDialog)

