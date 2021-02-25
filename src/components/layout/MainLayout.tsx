import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";
import {useSelector} from "react-redux";

import './MainLayout.css'

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
        // userManager.signinRedirect()
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#F1F1F0'
    })

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