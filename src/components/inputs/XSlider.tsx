import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {ISliderMark} from "../../interfaces/ISliderMark";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        margin: {
            height: theme.spacing(3),
        },
    }),
);

function valuetext(value: number) {
    return `${value}°C`;
}

interface IProps {
    marks: ISliderMark[]
}

export default function XSlider({marks}: IProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-always" gutterBottom>
                Always visible
            </Typography>
            <Slider
                defaultValue={80}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={10}
                marks={marks}
                valueLabelDisplay="on"
            />
        </div>
    );
}
