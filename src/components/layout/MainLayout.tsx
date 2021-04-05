import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";

import './MainLayout.css'
import userManager from "../../utils/userManager";
import {
    initialiseServiceWorker, subscribe
} from "../../utils/web-push/notifications";
import {checkBrowser} from "../../utils/web-push/browser";

const serviceWorker = '../../../public/service-worker.js'

interface IProps {
    user?: any
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function MainLayout(props: IProps) {

    const {user} = useSelector((state: any) => state.oidc)
    const isAuthenticated = user != null

    if (!isAuthenticated) {
        userManager.signinRedirect({state: window.location.pathname + window.location.search})
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#F1F1F0'

        if ('Notification' in window){

            const browser = checkBrowser()

            if (browser === 'chrome'){
                Notification.requestPermission().then(function (status) {
                    if (status === 'denied') {
                        console.log('[Notification.requestPermission] Browser denied permissions to notification api.');
                    } else if (status === 'granted') {
                        console.log('[Notification.requestPermission] Initializing service worker.');
                        initialiseServiceWorker();
                        subscribe(user.profile.sub)
                    }
                });
            }

        }

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