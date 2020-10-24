import {useLayoutStyles} from "./styles";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";

interface IProps {
    bgColor?: string
    padding?: string | number
    children?: any
    textColor?: any
    textAlign?: any
}

const wrapperStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down('sm')]: {
                padding: 15
            },
            display: 'block'
        }
    })
)

export const Wrapper = (props: IProps) => {

    const classes = useLayoutStyles();
    const styles = wrapperStyles();

    return (
        <div style={{
            backgroundColor: props.bgColor,
            color: props.textColor,
            textAlign: props.textAlign,
            padding: props.padding
        }}
             className={clsx(classes.fullWidth, styles.container)}>
            {props.children}
        </div>
    )
}