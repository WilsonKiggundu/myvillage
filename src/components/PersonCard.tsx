import React from "react";
import {Avatar, Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface IProps {
    name: string
    avatar: string
    id: string
    category: string
}

const PersonCard = (props: IProps) => {
    return (
        <Card>
            <Avatar src={props.avatar}/>
            <CardContent>
                <Typography variant="h5" component="h5">
                    {props.name}
                </Typography>
            </CardContent>
            <CardActions></CardActions>
        </Card>
    )
}

export default PersonCard