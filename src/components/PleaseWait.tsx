import Box from "@material-ui/core/Box";
import {CircularProgress} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React from "react";

export const PleaseWait = () => {
    return (
        <Container style={{textAlign: "center"}} maxWidth={"lg"}>
            <Box mt={5}>
                <CircularProgress variant={"indeterminate"} /><br/>
                <span>Please wait...</span>
            </Box>
        </Container>
    )
}