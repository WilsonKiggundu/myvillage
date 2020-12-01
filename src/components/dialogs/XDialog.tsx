import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {createStyles, Theme} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {themeBackground} from "../../theme/custom-colors";
import useTheme from "@material-ui/core/styles/useTheme";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import palette from "../../theme/palette";

interface IProps {
    minWidth?: number
    maxWidth?: 'sm' | 'md' | 'lg' | false
    title: string
    contentText?: string
    children: any
    open: boolean
    onClose: () => any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: palette.primary.main,
            position: 'relative',
            boxShadow: "none"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },

    }),
);

export default function XDialog(props: IProps) {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            maxWidth={props.maxWidth}
            fullWidth
            fullScreen={isMobile}
            scroll={"paper"}
            open={props.open}
            disableBackdropClick={true}
            onClose={props.onClose}
            onEscapeKeyDown={props.onClose}
            aria-labelledby="form-dialog-title">
            {
                isMobile ?
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" onClick={props.onClose} aria-label="close">
                                <CloseIcon style={{color: "white"}}/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {props.title}
                            </Typography>
                        </Toolbar>
                    </AppBar> :
                    <DialogTitle id="form-dialog-title">
                        <Grid container justify={"flex-end"}>
                            <Grid item xs={8}>
                                <Typography style={{padding: "8px 0"}} variant={"h5"} component={"h3"}>
                                    {props.title}
                                </Typography>
                            </Grid>
                            <Grid style={{textAlign: "right"}} item xs={4}>
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={props.onClose}
                                    aria-label="close">
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>

                    </DialogTitle>
            }

            <Divider />

            <DialogContent>
                {
                    props.contentText ?
                        <DialogContentText style={{fontSize: '1.1rem'}}>
                            {props.contentText}
                        </DialogContentText>
                        : ""
                }
                <div style={{marginLeft: '-16px', marginRight: '-16px'}}>
                    {props.children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
