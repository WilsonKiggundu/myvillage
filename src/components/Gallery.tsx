import {Box} from "@material-ui/core";
import React, {useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Overlay from "./Overlay";
import {globalStyles} from "../theme/styles";

interface IProps {
    items: any,
    title: string
}

const Gallery = (props: IProps) => {

    const classes = globalStyles()
    const [overlayState, setOverlayState] = useState(false)

    const handleClick = (image: any) => {
        setOverlayState(!overlayState)
    }

    return (
        <Box mb={2}>
            <Typography style={{padding: '15px 0'}}>{props.title}</Typography>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        {props.items ? props.items.map((p: any, index: number) => (
                            <Grid key={index} item xs={6} sm={3} md={4}>
                                <img className={classes.clickable}
                                     onClick={() => handleClick(p)}
                                     style={{width: '100%', height: 'auto'}}
                                     src={p}
                                     alt={p}/>
                            </Grid>
                        )) : ""}
                    </Grid>

                </CardContent>
            </Card>
            <Overlay open={overlayState} items={props.items}/>
        </Box>
    )
}

export default Gallery