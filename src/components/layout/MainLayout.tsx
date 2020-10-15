import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import NavMenu from "./NavMenu";
import {Typography} from "@material-ui/core";
import ApplicationBar from "../appBar/AppBar";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import {Wrapper} from "./Wrapper";

interface IProps {
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function MainLayout(props: IProps) {
    const classes = useLayoutStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    return (
        <>
            <div className={classes.root}>
                <CssBaseline/>
                <ApplicationBar />
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {props.children}
                </main>
            </div>
            <div className={clsx(classes.footer)}>
                <Divider />
                <Wrapper bgColor="#f1f1f1" textColor="#3c3c3c" padding={25}>
                    <footer>&copy; The Innovation Village</footer>
                </Wrapper>
            </div>
        </>
    );
}

export default MainLayout