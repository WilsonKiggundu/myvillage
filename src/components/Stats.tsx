import React from "react";
import Typography from "@material-ui/core/Typography";

interface IProps {
    children?: any
    title: string
    width?: number | string
    height?: number | string
    padding?: number
    bgColor?: string
    margin?: number
    radius?: number | string
    details: string
    textColor?: string
}


export const Stats = (props: IProps) => {
    return (
        <div style={{
            textAlign: "center",
            backgroundColor: props.bgColor,
            color: props.textColor,
            padding: props.padding
        }}>
            <div style={{textAlign: "center"}}>
                {props.children}
                <Typography component="h3" variant="h3">
                    <strong>{props.title}</strong>
                </Typography>
                <Typography component="p" variant="h6">
                    {props.details}
                </Typography>
            </div>
        </div>
    )
}