import {isOffline} from "../utils/ajax";
import {ImageLoader} from "./loaders/ImageLoader";
import React from "react";

interface IProps {
    src: string
    alt?: any
}

const XImage = (props: IProps) => {
    if (isOffline()) return <ImageLoader/>
    return (
        <img {...props} style={{
                 maxWidth: '100%',
                 margin: "0 15px 15px 0",
                 display: "inline"
             }}/>
    )
}

export default XImage