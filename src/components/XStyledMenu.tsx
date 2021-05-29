import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {Divider} from "@material-ui/core";
import './XStyledMenu.css'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    }
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            // backgroundColor: theme.palette.primary.main,
            // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            //     color: theme.palette.common.white,
            // },
        },
    },
}))(MenuItem);

interface IProps {
    anchor: null | HTMLElement
    items: any,
    onClose: () => void
}

export default function XStyledMenu({anchor, items, onClose}: IProps) {

    return (
        <StyledMenu
            id="customized-menu"
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={onClose}
        >
            {items.map((item: any, index: number) => (
                <div key={index}>
                    <StyledMenuItem onClick={item.onClick}>
                        {item.icon && <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>}
                        <ListItemText primary={item.primaryText} secondary={item.secondaryText} />
                    </StyledMenuItem>
                    {index < items.length - 1 && <Divider />}
                </div>
            ))}
        </StyledMenu>
    );
}
