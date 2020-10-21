import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import GridWrapper from "../../components/GridWrapper";
import {remoteRoutes} from "../../data/constants";
import {useDispatch} from "react-redux";
import {handleLogin, handleLogout, startLoading, stopLoading} from "../../data/coreActions";
import {get, getToken} from "../../utils/ajax";
import {LinearProgress} from "@material-ui/core";

export default function Splash() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startLoading())
        get(remoteRoutes.profile,
            data => {
                dispatch(handleLogin({user: data, token: getToken()}))
            }, (err) => {
                dispatch(handleLogout())
            }, () => {
                dispatch(stopLoading())
            }
        )
    },[dispatch])


    return <GridWrapper>
        <Grid container spacing={10} justify='center' alignItems="center">
            <Grid item>
                <LinearProgress color="secondary"/>
            </Grid>
        </Grid>
    </GridWrapper>
}