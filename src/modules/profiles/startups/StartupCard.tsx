import React from "react";
import {Card, createStyles, Theme} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Routes} from "../../../routes/routes";
import {globalStyles} from "../../../theme/styles";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardMedia from "@material-ui/core/CardMedia";
import {useHistory} from 'react-router-dom';

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

        tile: {
          borderRadius: 0
        },

        flat: {
            boxShadow: 'none'
        },


    }),
);

const StartupCard = (props: IProps) => {

    const styles = globalStyles()
    const classes = useStyles()
    const history = useHistory()

    const handleClick = (id: string) => {
        const url = `${Routes.profiles.startups}/${id}`
        history.push(url)
    }

    return (
        <Card style={{textAlign: "center", padding: 10}}
              className={clsx(classes.flat, classes.tile)}>
            <CardActionArea style={{height: 300}}>
                <CardMedia
                    image="../../assets/images/tiv-logo.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="h5" style={{textAlign: "center"}}>
                        {props.name}
                        <Typography paragraph>{props.category}</Typography>
                    </Typography>
                    <div className={classes.root}>
                        {props.interests?.map((m, i) => <Chip key={i} size="small" label={m} variant="outlined"/>)}
                    </div>
                </CardContent>
                <CardActions style={{position: "absolute", width:'100%', bottom: 0}}>
                        <Button
                            className={clsx(classes.flat, classes.tile, styles.flex)}
                            href={Routes.profiles.startups + '/' + props.id}
                            size="small"
                            onClick={() => handleClick(props.id)}
                            variant="outlined"
                            color="secondary">
                             Profile
                        </Button>
                        <Button variant="contained"
                                className={clsx(classes.flat, classes.tile, styles.flex)}
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