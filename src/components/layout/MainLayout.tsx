import React, {forwardRef, useEffect, useRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";
import ReactGA from 'react-ga'

import './MainLayout.css'
import {userSelector} from "../../data/coreSelectors";

interface IProps {
    user?: any
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function MainLayout(props: IProps) {

    const user = useSelector(userSelector)

    const trackingId = process.env.GA_TRACKING_ID ?? ''
    ReactGA.initialize(trackingId)
    ReactGA.set({
        userId: user.profile.sub
    })

    useEffect(() => {
        document.body.style.backgroundColor = '#F1F1F0'
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