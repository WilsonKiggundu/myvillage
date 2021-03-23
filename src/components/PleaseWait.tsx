import Box from "@material-ui/core/Box";
import {CircularProgress} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React from "react";

interface IProps{
    label?: string
}

export const PleaseWait = ({label}: IProps) => {
    return (
        <Container style={{textAlign: "center"}} maxWidth={false}>
            <Box mt={5}>
                <CircularProgress color={"secondary"} variant={"indeterminate"}/><br/>
                <span>{label}</span>
            </Box>
        </Container>
    )
}