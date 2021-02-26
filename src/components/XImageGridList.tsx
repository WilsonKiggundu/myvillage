import React, {useState} from "react";
import {IUpload} from "../interfaces/IUpload";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Backdrop from "@material-ui/core/Backdrop";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ChevronLeft, ChevronRight, Close} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css';

interface IProps {
    images: IUpload[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginLeft: -25,
        marginRight: -25
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },

    clickable: {
        cursor: 'pointer'
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#f1f1f1'
    },

    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 10
    }
}));

const XImageGridList = ({images, scrollPosition}: any) => {

    const classes = useStyles();
    const columns = () => {
        const count = images.length
        if (count <= 2) return count
        else return 2
    }

    const [showBackdrop, setShowBackdrop] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [imageIndex, setImageIndex] = useState<number>(0)

    const handleImageClick = (url: string, index: number) => {
        setShowBackdrop(true)
        setPreviewImage(url)
        setImageIndex(index)
    }

    const showPreviousImage = () => {
        if (imageIndex === 0) return
        setImageIndex(imageIndex - 1)
    }

    const showNextImage = () => {
        if (imageIndex === images.length - 1) return
        setImageIndex(imageIndex + 1)
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={"auto"} spacing={0} className={classes.gridList} cols={columns()}>
                {images.map((image: IUpload, index: number) => (
                    <GridListTile className={classes.clickable} onClick={() => handleImageClick(image.path, index)}
                                  key={index}
                                  cols={1}>
                        <LazyLoadImage
                            width={'100%'}
                            src={image.path}
                            scrollPosition={scrollPosition}
                            alt={image.fileName}
                            effect={'blur'}
                        />
                    </GridListTile>
                ))}
            </GridList>

            <Backdrop
                open={showBackdrop}
                className={classes.backdrop}>
                <Container maxWidth={"lg"}>
                    <IconButton
                        color={"secondary"}
                        onClick={() => setShowBackdrop(false)}
                        className={classes.closeBtn}>
                        <Close/>
                    </IconButton>
                    <Grid container>
                        <Grid xs={1} item>
                            {imageIndex > 0 && <IconButton onClick={showPreviousImage}>
                                <ChevronLeft/>
                            </IconButton>}
                        </Grid>
                        <Grid xs={10} style={{textAlign: 'center'}} item>
                            <img src={images[imageIndex].path} alt=""/>
                        </Grid>
                        <Grid xs={1} item>
                            {imageIndex < images.length - 1 && <IconButton onClick={showNextImage}>
                                <ChevronRight/>
                            </IconButton>}
                        </Grid>
                    </Grid>
                </Container>
            </Backdrop>

        </div>
    );

}

export default trackWindowScroll(XImageGridList)