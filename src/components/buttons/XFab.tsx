import Fab, {FabProps} from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

type Position = 'absolute' | 'relative' | 'fixed' | 'static'
type Size = 'small' | 'medium' | 'large'

interface IProps {
    size?: Size
    position?: Position
    bottom?: number
    top?: number
    left?: number
    right?: number
    children: any
}
export function XFab({children, left, right, bottom, top, position, ...rest}: IProps & FabProps) {
    return <Fab
        style={{
            position: position,
            bottom: bottom,
            top: top,
            left: left,
            right: right
        }}
        {...rest}
        aria-label="edit">
        {children}
    </Fab>;
}