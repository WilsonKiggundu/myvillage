import React from "react";
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import {Box} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

export const VideoLoader = () => {
    return (
        <Box style={{
            backgroundColor: grey[100],
            padding: 45,
            display: 'flex',
            textAlign: "center",
            color: grey[300]
        }}
        >
            <VideocamOffIcon/><br/>
            You are offline
        </Box>
    );
};
