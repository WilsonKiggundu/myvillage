import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";

import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css';
import './GridList.css'
import {Container, useTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

// interface IProps {
//     images: IUpload[]
// }

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },

    clickable: {
        cursor: 'pointer'
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#1c1c1c',
        opacity: 0.8
    },
}));

const XImageGridList = ({images, scrollPosition}) => {

    const theme = useTheme()
    const isMobile = theme.breakpoints.down("xs")
    const classes = useStyles();
    const columns = () => {
        const count = images.length
        if (count === 1) return 1
        if (count === 2) return 2
        if (count === 3) return 2.5
        return 3.5
    }

    const [photoGrid, setPhotoGrid] = useState([])
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [imageIndex, setImageIndex] = useState(0)

    const handleImageClick = (url, index) => {

        setShowBackdrop(true)
        setPreviewImage(url)
        setImageIndex(index)
    }

    const showPreviousImage = () => {
        if (imageIndex === 0) return
        setImageIndex(imageIndex - 1)
    }

    const showNextImage = () => {
        if (imageIndex === images.length - 1) {
            handleClose()
            return
        }
        setImageIndex(imageIndex + 1)
    }

    const handleClose = () => {
        setShowBackdrop(false)
    }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={columns()} cellHeight={250}>
                {images.map((image, index) => (
                    <GridListTile
                        className={classes.clickable}
                        onClick={() => handleImageClick(image.path, index)}
                        key={index} cols={1}>
                        <LazyLoadImage
                            width={'100%'}
                            // style={{height: 300}}
                            src={image.path}
                            scrollPosition={scrollPosition}
                            alt={image.fileName}
                            effect={'blur'}
                        />
                    </GridListTile>
                ))}
            </GridList>

            <Backdrop className={classes.backdrop} open={showBackdrop} onClick={showNextImage}>
                {/*<IconButton*/}
                {/*    onClick={handleClose}*/}
                {/*    className="close-button">*/}
                {/*    <CloseIcon />*/}
                {/*</IconButton>*/}

                <Container maxWidth={"lg"}>
                    <Grid container justify={"center"} className="image-container">
                        <Grid
                            onClick={showNextImage}
                            style={{textAlign: 'center'}}
                            item>
                            <img className="image" src={images[imageIndex].path} alt=""/>
                        </Grid>
                    </Grid>
                </Container>

            </Backdrop>

        </div>
    );

}

export default trackWindowScroll(XImageGridList)