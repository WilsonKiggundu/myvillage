import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiListItem from "@material-ui/core/ListItem";
import React, {useState} from "react";
import {List} from "@material-ui/icons";
import {ListItemText} from "@material-ui/core";
import palette from "../theme/palette";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: palette.secondary.dark
    },

    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0
    }
}))

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "red",
            color: "white"
        },
        "&$selected:hover": {
            backgroundColor: "purple",
            color: "white"
        },
        "&:hover": {
            backgroundColor: "blue",
            color: "white"
        }
    },
    selected: {},
})(MuiListItem);

export default function TopBarNav() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleListItemClick = (event: any, index: ((prevState: number) => number) | number) => {
        setSelectedIndex(index);
    }

    return (
        <div className="">
            <List className={classes.flexContainer}>
                <ListItem button selected={selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
                    <ListItemText primary="Startups"/>
                </ListItem>
                <ListItem button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
                    <ListItemText primary="Startups"/>
                </ListItem>
                <ListItem button selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
                    <ListItemText primary="Startups"/>
                </ListItem>
                <ListItem button selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
                    <ListItemText primary="Startups"/>
                </ListItem>
            </List>
        </div>
    )
}