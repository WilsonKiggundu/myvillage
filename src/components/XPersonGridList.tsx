import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {IPerson} from "../modules/profiles/people/IPerson";
import palette from "../theme/palette";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {CardContent, isWidthUp} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory } from 'react-router-dom';
import {Urls} from "../routes/Urls";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    cardImage: {
        height: 150
    },
    gridList: {
        width: '100%',
        height: 'auto',
        transform: 'translateZ(0)'
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: palette.white,
    },
}));

interface IProps {
    people: IPerson[]
}

export const XPersonGridList = ({people}: IProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const history = useHistory()

    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const isTablet = useMediaQuery(theme.breakpoints.between('xs', 'sm'))
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const handleViewProfile = (personId: string) => {
        history.push(Urls.profiles.onePerson(personId))
    }

    const columns = isMobile ? 2 : 4

    return (
        <div className={classes.root}>
            <GridList cellHeight={"auto"} spacing={15} cols={columns} className={classes.gridList}>
                {people?.map((person: IPerson, index: number) => (
                    <GridListTile key={index}>
                        <Card style={{borderRadius: 0, backgroundColor: grey[100]}}>
                            <CardActionArea onClick={() => handleViewProfile(person.id)}>
                                <CardMedia
                                    className={classes.cardImage}
                                    image={person.avatar}/>

                                    <CardContent>
                                        <Typography noWrap variant={"body2"}>
                                            <strong>{person.firstname} {person.lastname}</strong>
                                        </Typography>
                                        <Typography noWrap variant={"body2"}>
                                            {person.bio.substr(0, 30)}...
                                        </Typography>

                                    </CardContent>
                            </CardActionArea>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}