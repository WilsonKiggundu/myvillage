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
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import palette from "../../../theme/palette";
import { useHistory } from "react-router-dom";
import {Endpoints} from "../../../services/Endpoints";
import CardMedia from "@material-ui/core/CardMedia";
import grey from "@material-ui/core/colors/grey";
import {white} from "../../../theme/custom-colors";

interface IProps {
    id: string
    name: string
    description: string
    interests?: [string]
    category?: string
    logo?: string
    coverPhoto?: string
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

const StartupCard = ({coverPhoto, ...props}: IProps) => {

    const styles = globalStyles()
    const classes = useStyles()
    const history = useHistory()

    const handleClick = (id: string) => {
        const route = Urls.profiles.singleStartup(id)
        history.push(route)
    }

    return (
        <Card style={{textAlign: "center"}}>

            {/*{coverPhoto ? <CardMedia*/}
            {/*    style={{height: 180}}*/}
            {/*    image={coverPhoto}*/}
            {/*    title={props.name}*/}
            {/*/> : <Box style={{height: 100, backgroundColor: white}}></Box>}*/}

            <CardContent style={{paddingTop: 25}}>

                <Avatar variant={"circular"}
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

                {/*<Box mt={1} mb={1}>*/}
                {/*    <Typography component="div">*/}
                {/*        <Chip size="small" label={props.category}/>*/}
                {/*    </Typography>*/}
                {/*</Box>*/}

                {/*<ProfileRating rating={3} />*/}

                <Box mx={"auto"} mb={2} mt={4}>
                    <Button
                        className={clsx(styles.flex, styles.noShadow)}
                        onClick={() => handleClick(props.id)}
                        variant="contained"
                        style={{
                            color: palette.tertiary.main
                        }}>
                        <strong>View profile</strong>
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default StartupCard