import {isOffline} from "../utils/ajax";
import {ImageLoader} from "./loaders/ImageLoader";
import React from "react";
import VideoPoster from "../assets/images/My-Village-Full-logo-02.svg";
import {VideoLoader} from "./loaders/VideoLoader";

interface IProps {
    src: string
    contentType?: string
}

const XVideo = (props: IProps) => {
    if (isOffline()) return <VideoLoader/>
    return (
        <video controls
               poster={VideoPoster}
               style={{width: "100%", height: "auto"}}
               autoPlay={false}
               color={"white"}
               preload={'auto'}>
            <source {...props}/>
            Your browser does not support videos
        </video>
    )
}

export default XVideo