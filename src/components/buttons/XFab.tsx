import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

interface IProps {
    color?: any
    children: any
    onClick?: () => {}
}
export function XFab(props: IProps) {
    return <Fab
        style={{
            position: "absolute",
            bottom: 0,
            right: 0
        }}
        onClick={props.onClick}
        size={"small"}
        color={"default"}
        aria-label="edit">
        {props.children}
    </Fab>;
}