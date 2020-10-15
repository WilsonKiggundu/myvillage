import React from "react";
import {Card, createStyles, Theme} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Routes} from "../../../data/routes";
import {globalStyles} from "../../../theme/styles";
import clsx from "clsx";
import FollowIcon from "@material-ui/icons/Folder"
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface IProps {
    id: string
    name: string
    interests?: [string]
    category?: string
    logo?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    }),
);

const StartupCard = (props: IProps) => {

    const styles = globalStyles()
    const classes = useStyles()

    return (
        <Card style={{textAlign: "center"}} variant="elevation">
            <CardActionArea style={{height: 300}}>
                <CardContent>
                    <Typography variant="h5" style={{textAlign: "center"}}>
                        {props.name}
                        <Typography paragraph>{props.category}</Typography>
                    </Typography>
                    <div className={classes.root}>
                        {props.interests?.map((m, i) => <Chip key={i} size="small" label={m} variant="outlined"/>)}
                    </div>
                </CardContent>
                <CardActions style={{position: "absolute", bottom: 0}}>
                    <Button
                        className={clsx(styles.noShadow, styles.flex)}
                        href={Routes.profiles.startups + '/' + props.id}
                        size="small"
                        color="primary">
                        View Profile
                    </Button>
                    <Button variant="outlined"
                            className={clsx(styles.noShadow, styles.flex)}
                            href={Routes.profiles.startups + '/' + props.id}
                            size="small"
                            color="primary">
                        Connect
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default StartupCard