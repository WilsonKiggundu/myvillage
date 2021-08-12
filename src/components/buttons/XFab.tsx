import Fab, {FabProps} from "@material-ui/core/Fab";
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";

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

    const theme = useTheme()

    return <Fab
        style={{
            position: position,
            bottom: bottom,
            top: top,
            left: left,
            textTransform: "inherit",
            right: right,
            zIndex: theme.zIndex.appBar + 1
        }}
        {...rest}
        aria-label="edit">
        {children}
    </Fab>;
}