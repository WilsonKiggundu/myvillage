import {Box, createStyles, Theme} from "@material-ui/core";
import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

interface IProps {
    open: boolean
    items: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        overlay: {
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            opacity: 0.9,
            backgroundColor: grey[100],
            zIndex: theme.zIndex.appBar + 1
        },

        container: {
            backgroundColor: grey[900],
            minHeight: '80vh',
            marginTop: '10vh',
            borderRadius: 10,
            maxHeight: '80vh',
            opacity: 1,

            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
                borderRadius: 0,
            }
        }
    }))

const Overlay = (props: IProps) => {

    const open = props.open
    const classes = useStyles()

    return (
        <>
            {
                open ? (
                    <Box className={classes.overlay}>
                        <Container className={classes.container} maxWidth={"lg"}>
                            Here
                        </Container>
                    </Box>
                ) : ""
            }
        </>

    )
}

export default Overlay