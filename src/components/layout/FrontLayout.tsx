import React from "react";
import {useLayoutStyles} from "./styles";
import Paper from "@material-ui/core/Paper";
import ApplicationBar from "../appBar/AppBar";
import {Container} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {Wrapper} from "./Wrapper";

interface IProps {
    title?: string
    children?: any,
    mobilePadding?: boolean
}

function FrontLayout(props: IProps) {
    const classes = useLayoutStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <>
            <div className={classes.root}>
                <ApplicationBar/>
                <main style={{marginTop: 64, display: "block"}} className={`${classes.root}`}>
                    {props.children}
                </main>
            </div>
            <div className={classes.footer}>
                <Divider />
                <Wrapper bgColor="#3C3C3C" textColor="white" padding={25}>
                    <footer>&copy; The Innovation Village Kampala</footer>
                </Wrapper>
            </div>
        </>
    )
}

export default FrontLayout