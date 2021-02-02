import React, {useEffect, useState} from "react";
import {IUpload} from "../interfaces/IUpload";
import {Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";

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
}));

const XImageGridList = ({images}: IProps) => {

    const classes = useStyles();
    const columns = () => {
        const count = images.length
        if (count <= 2) return count
        else return 2
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight={"auto"} spacing={0} className={classes.gridList} cols={columns()}>
                {images.map((image: IUpload, index: number) => (
                    <GridListTile key={index} cols={1}>
                        <img width={'100%'} src={image.path} alt={image.fileName} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );

}

export default XImageGridList