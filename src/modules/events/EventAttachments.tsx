import {IUpload} from "../../interfaces/IUpload";
import {Box} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {IsImage} from "../../utils/fileHelpers";
import XImageGridList from "../../components/grid-list/XImageGridList";

interface IProps {
    uploads?: IUpload[]
}

const handleDownload = (path: string) => {
    window.open(path, '_blank')
}

const EventAttachments = ({uploads}: IProps) => {

    const [images, setImages] = useState()

    useEffect(() => {
        const images = uploads?.filter(upload => IsImage(upload.path))
        setImages(images)
    }, [uploads])

    return (
        <>
            {
                images?.length ?
                    <Box mt={2} mb={2}>
                        <XImageGridList images={images}/>
                    </Box> : ""
            }
        </>
    )
}

export default EventAttachments