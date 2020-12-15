import React from "react";
import {Card, createStyles, Theme} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Urls} from "../../../routes/Urls";
import {globalStyles} from "../../../theme/styles";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import ProfileRating from "../../../components/ProfileRating";
import Box from "@material-ui/core/Box";

interface IProps {
    id: string
    name: string
    description: string
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

        truncate: {
            height: 50,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
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

    const handleClick = (id: string) => {
        const url = `${Urls.profiles.startups}/${id}`
        window.location.replace(url)
    }

    return (
        <Card style={{textAlign: "center"}}>
            <CardContent style={{paddingTop: 25}}>

                <Avatar variant={"circle"}
                        className={clsx(styles.mediumAvatar, styles.centerAvatar)}
                        src={props.logo}/>

                <Typography noWrap
                            variant="h6"
                            className={classes.truncate}
                            style={{textAlign: "center", marginTop: 15}}>
                    {props.name}
                </Typography>

                {props.description ?
                    <Typography className={styles.maxLines} style={{whiteSpace: 'pre-line'}} variant={"body2"}>
                        {props.description}
                    </Typography>
                    : ""}

                <Box mt={1} mb={1}>
                    <Typography component="div">
                        <Chip size="small" label={props.category}/>
                    </Typography>
                </Box>

                {/*<ProfileRating rating={3} />*/}

                <Box mx={"auto"} mb={2} mt={4}>
                    <Button
                        className={clsx(styles.flex, styles.noShadow)}
                        onClick={() => handleClick(props.id)}
                        variant="contained"
                        color="primary">
                        <strong>View profile</strong>
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default StartupCard