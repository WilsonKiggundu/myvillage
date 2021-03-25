import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {Slide} from "@material-ui/core";
import React from "react";

const HideOnScroll = ({children}: any) => {
    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

export default HideOnScroll