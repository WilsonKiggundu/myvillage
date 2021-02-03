import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridWrapper from "../../components/GridWrapper";
import {LinearProgress} from "@material-ui/core";

export default function Splash() {

    return <GridWrapper>
        <Grid container spacing={10} justify='center' alignItems="center">
            <Grid item>
                <LinearProgress color="secondary"/>
            </Grid>
        </Grid>
    </GridWrapper>
}