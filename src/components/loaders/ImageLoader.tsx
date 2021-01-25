import React from "react";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {Box} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

export const ImageLoader = () => {
    return (
        <Box style={{
            backgroundColor: grey[100],
            padding: 45,
            textAlign: "center",
            color: grey[300]
        }}
        >
            <PhotoCameraIcon/><br/>
            You are offline
        </Box>
    );
};
