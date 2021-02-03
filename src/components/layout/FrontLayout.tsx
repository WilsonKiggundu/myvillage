import React from "react";
import {useLayoutStyles} from "./styles";
import {Theme} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {Wrapper} from "./Wrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

interface IProps {
    title?: string
    children?: any,
    mobilePadding?: boolean
}

const footerStyles = makeStyles((theme: Theme) => ({
        footer: {
            position: 'absolute',
        }
    })
)

function FrontLayout(props: IProps) {
    const classes = useLayoutStyles();
    const styles = footerStyles()

    return (
        <>
            <div className={classes.root}>
                <main className={`${classes.root}`}>
                    {props.children}
                </main>
            </div>
            <div className={clsx(classes.footer, styles.footer)}>
                <Divider/>
                <Wrapper bgColor="#f1f1f1" textColor="#3c3c3c" padding={25}>
                    <footer>&copy; The Innovation Village Kampala</footer>
                </Wrapper>
            </div>
        </>
    )
}

export default FrontLayout