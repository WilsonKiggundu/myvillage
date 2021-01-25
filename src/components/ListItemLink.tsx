import {ListItemProps, withStyles} from "@material-ui/core";
import React from "react";
import palette from "../theme/palette";
import MuiListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";

const ListItem = withStyles({
    root: {
        width: "auto",
        "&$selected": {
            backgroundColor: palette.tertiary.main,
            color: "white"
        },
        "&$selected:hover": {
            backgroundColor: palette.tertiary.main,
            color: "white"
        },
        "&:hover": {
            backgroundColor: palette.tertiary.main,
            color: "white"
        }
    },
    selected: {}
})(MuiListItem);

interface IProps {
    handleClick: () => void
    children?: any
}

const ListItemLink = ({handleClick, ...props}: IProps) => {

    return (
        <ListItem onClick={handleClick} button {...props} />
    )
}

export default ListItemLink