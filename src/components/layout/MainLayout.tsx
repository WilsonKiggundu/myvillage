import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";
import userManager from "../../utils/userManager";
import { Redirect } from 'react-router-dom';
import {Urls} from "../../routes/Urls";
import {isOffline} from "../../utils/ajax";

interface IProps {
    user?: any
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function MainLayout(props: IProps) {
    const classes = useLayoutStyles();

    const {user} = useSelector((state: any) => state.oidc)
    const isAuthenticated = user != null

    isOffline()

    if (!isAuthenticated) {
        userManager.signinRedirect()
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <header>
                <ApplicationBar/>
            </header>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <div style={{paddingBottom: 25, paddingTop: 25}}>
                    {props.children}
                </div>
            </main>
        </div>
    );
}

export default MainLayout