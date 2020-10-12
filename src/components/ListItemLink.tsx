import {withStyles} from "@material-ui/core";
import React from "react";
import palette from "../theme/palette";
import MuiListItem from "@material-ui/core/ListItem";

const ListItem = withStyles({
    root: {
        width: "auto",
        textAlign: "center",
        "&$selected": {
            backgroundColor: palette.primary.light,
            color: "white"
        },
        "&$selected:hover": {
            backgroundColor: palette.primary.light,
            color: "white"
        },
        "&:hover": {
            backgroundColor: palette.primary.light,
            color: "white"
        }
    },
    selected: {}
})(MuiListItem);

export default (props: any) => <ListItem alignItems="center" button component="a" {...props} />