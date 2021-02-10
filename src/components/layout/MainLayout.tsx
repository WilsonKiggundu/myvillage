import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";
import userManager from "../../utils/userManager";
import { Redirect } from 'react-router-dom';
import {Urls} from "../../routes/Urls";
import {isOffline} from "../../utils/ajax";
import clsx from "clsx";

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

    if (!isAuthenticated) {
        // userManager.signinRedirect()
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <header>
                <ApplicationBar/>
            </header>
            <main className={clsx(classes.content)}>
                <div className={classes.toolbar}/>
                {props.children}
            </main>
        </div>
    );
}

export default MainLayout