import React, {useState} from "react";
import {Drawer} from "@material-ui/core";

import './XDrawer.css'

export type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface IProps {
    anchor: Anchor
    open: boolean
    onClose: () => void
    children: any
}

export default function XDrawer({anchor, open, onClose, children}: IProps){
    return (
        <Drawer className="Drawer" anchor={anchor} open={open} onClose={onClose}>
            {children}
        </Drawer>
    )
}