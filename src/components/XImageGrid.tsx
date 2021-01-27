import useWindowSize from "../utils/windowHelpers";
import {useState} from "react";

const XImageGrid = (uploads: any) => {

    let windowSize = useWindowSize()
    let generatedImages = uploads.map(() => {
        const height = Math.floor(Math.random() * (600 - 300) + 300);
        const width = Math.floor(Math.random() * (700 - 200) + 200);
        return {
            src: `https://via.placeholder.com/${width}x${height}`,
            width: width * 10,
            height: height * 10
        };

    })

    const [images] = useState(generatedImages);

}

export default XImageGrid