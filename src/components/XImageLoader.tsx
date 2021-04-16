import {LazyLoadImage, LazyLoadImageProps} from "react-lazy-load-image-component";
import React from "react";

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

interface IProps {
    effect: string
}

const XImageLoader = ({effect, ...rest} : IProps & LazyLoadImageProps) => {
    return (
        <LazyLoadImage
            {...rest}
            effect={effect}
        />
    )
}

export default XImageLoader