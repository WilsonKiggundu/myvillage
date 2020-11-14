import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useLayoutStyles} from "./styles";
import ApplicationBar from "../appBar/AppBar";

interface IProps {
    user?: any
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function MainLayout(props: IProps) {
    const classes = useLayoutStyles();

    return (
        <>
            <div className={classes.root}>
                <CssBaseline/>
                <header>
                    <ApplicationBar />
                </header>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <div style={{paddingTop: 25, paddingBottom: 25}}>
                        {props.children}
                    </div>
                </main>
            </div>
            {/*<div className={clsx(classes.footer)}>*/}
            {/*    <Divider />*/}
            {/*    <Wrapper textAlign="left" bgColor={palette.primary.light} textColor="#ffffff" padding={25}>*/}
            {/*        <footer>&copy; The Innovation Village</footer>*/}
            {/*    </Wrapper>*/}
            {/*</div>*/}
        </>
    );
}

export default MainLayout