import React from "react";
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface IProps{
    name: string
    avatar: string
    id: string
    category: string
}

const PersonCard = (props: IProps) => {
    return (
        <Card>
            <CardActionArea>
                <Avatar src={props.avatar} />
                <CardContent>
                    <Typography variant="h5" component="h5">
                        {props.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
        </Card>
    )
}

export default PersonCard