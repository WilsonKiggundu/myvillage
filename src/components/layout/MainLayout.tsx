import React, {forwardRef, useEffect, useRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";
import ReactGA from 'react-ga'

import './MainLayout.css'
import userManager from "../../utils/userManager";
import {
    initialiseServiceWorker, subscribe
} from "../../utils/web-push/notifications";
import {checkBrowser} from "../../utils/web-push/browser";
import {Alert} from "@material-ui/lab";

interface IProps {
    user?: any
    title?: string
    children?: any,
    mobilePadding?: boolean
}

ReactGA.initialize('')

function MainLayout(props: IProps) {

    const {user} = useSelector((state: any) => state.oidc)
    // const isAuthenticated = user != null
    //
    // if (!isAuthenticated) {
    //     userManager.signinRedirect({state: window.location.pathname + window.location.search})
    // }

    useEffect(() => {
        document.body.style.backgroundColor = '#F1F1F0'

        if (process.env.REACT_APP_ENV === 'Production'){
            if (process.env.REACT_APP_ENV === 'Production'){
                ReactGA.initialize('UA-192556411-2')
                ReactGA.pageview(window.location.pathname + window.location.search);
            }
        }

        // if ('Notification' in window && user){
        //
        //     const browser = checkBrowser()
        //
        //     if (browser === 'chrome'){
        //         Notification.requestPermission().then(function (status) {
        //             if (status === 'denied') {
        //                 console.log('[Notification.requestPermission] Browser denied permissions to notification api.');
        //             } else if (status === 'granted') {
        //                 console.log('[Notification.requestPermission] Initializing service worker.');
        //                 initialiseServiceWorker();
        //                 subscribe(user.profile.sub)
        //             }
        //         });
        //     }
        //
        // }

    }, [user])

    return (
        <>
            <CssBaseline/>
            <ApplicationBar/>
            <main className="MainLayout-main">
                {props.children}
            </main>
        </>
    );
}

export default MainLayout