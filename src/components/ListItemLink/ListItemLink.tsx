import {ListItemProps, withStyles} from "@material-ui/core";
import React from "react";
import palette from "../../theme/palette";
import MuiListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import './ListItemLink.css'

interface IProps {
    handleClick: () => void
    children?: any
}

const ListItemLink = ({handleClick, ...props}: IProps) => {

    return (
        <div className="ListItemLink-root">
            <MuiListItem className="ListItemLink-item" onClick={handleClick} button {...props} />
        </div>
    )
}

export default ListItemLink