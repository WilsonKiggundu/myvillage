import {withStyles} from "@material-ui/core";
import React from "react";
import palette from "../theme/palette";
import MuiListItem from "@material-ui/core/ListItem";

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

export default (props: any) => <ListItem button component="a" {...props} />