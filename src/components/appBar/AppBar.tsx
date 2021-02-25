import React, {MouseEvent, useEffect, useState} from "react";
import {Divider, Drawer, Typography, useTheme} from "@material-ui/core";
import {appBarStyles} from "./styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItemLink from "../ListItemLink/ListItemLink";
import {MainMenuItems} from "./MainMenuItems";
import {white} from "../../theme/custom-colors";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Urls} from "../../routes/Urls";

import {ReactComponent as MyVillageLogo} from "../../assets/images/mv-colored-logo.svg"
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {User} from "oidc-client";
import userManager from "../../utils/userManager";
import {USER_SIGNED_OUT} from "redux-oidc";
import {useHistory, useLocation} from "react-router-dom";
import {userSelector} from "../../data/coreSelectors";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import './AppBar.css'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuIcon from "@material-ui/icons/Menu";

type Anchor = 'left' | 'right';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


export default function ApplicationBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    const classes = useStyles();
    const appbarStyles = appBarStyles()
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const user: User = useSelector(userSelector)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const showProfileMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const closeProfileMenu = () => {
        setAnchorEl(null)
    }

    const [state, setState] = useState({
        left: false,
        right: false
    })

    const anchor = 'left';

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const handleProfileView = () => {
        closeProfileMenu()
        history.push(Urls.profiles.onePerson(user?.profile?.sub))
        setState({left: false, right: false})
    }

    const handleLogout = async () => {
        dispatch({
            type: USER_SIGNED_OUT
        })
        await userManager.signoutRedirect({
            id_token_hint: user.id_token
        })
    }

    const handleClick = (href: string) => {
        history.push(href)
        setState({left: false, right: false})
    }

    const [activeMenu, setActiveMenu] = useState<string>('')

    const location = useLocation()

    useEffect(() => {
        const locationArray = location.pathname.split('/')
        if (locationArray.includes('feed')) setActiveMenu('feed')
        if (locationArray.includes('startups')) setActiveMenu('startups')
        if (locationArray.includes('people')) setActiveMenu('community')
        if (locationArray.includes('events')) setActiveMenu('events')
        if (locationArray.includes('jobs')) setActiveMenu('jobs')
    })

    return (
        <header className="Appbar-root">

            <Grid container justify={"space-between"}>
                <Grid item>
                    <MyVillageLogo className="Appbar-logo"/>
                </Grid>
                {!isMobile && <Grid item>
                    <ul className="Appbar-menu">
                        <li className={activeMenu === 'feed' ? 'active' : ''}>
                            <a href={Urls.feed}>Feed</a>
                        </li>
                        <li className={activeMenu === 'startups' ? 'active' : ''}>
                            <a href={Urls.profiles.startups}>Startups</a>
                        </li>
                        <li className={activeMenu === 'community' ? 'active' : ''}>
                            <a href={Urls.profiles.people}>Community</a>
                        </li>
                        <li className={activeMenu === 'events' ? 'active' : ''}>
                            <a href={Urls.events}>Events</a>
                        </li>
                        <li className={activeMenu === 'jobs' ? 'active' : ''}>
                            <a href={Urls.jobs.list}>Jobs</a>
                        </li>
                    </ul>
                </Grid>}
                <Grid item>
                    {isMobile ?
                        <IconButton
                            onClick={toggleDrawer(anchor, true)}>
                            <div className="Appbar-profile">
                                <MenuIcon className="Appbar-menu-icon"/>
                            </div>
                        </IconButton> :
                        <>
                            <IconButton aria-controls="profile-menu"
                                        aria-haspopup="true"
                                        onClick={showProfileMenu}
                                        color="inherit">
                                <div className="Appbar-profile">
                                    <div className="Appbar-profile-avatar">
                                        <Avatar className={classes.small} src={user?.profile?.picture}
                                                variant={"circular"}/>
                                    </div>
                                    <div className="Appbar-profile-dropdown-icon">
                                        <KeyboardArrowDownIcon/>
                                    </div>

                                </div>
                            </IconButton>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                getContentAnchorEl={null}
                                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                                onClose={closeProfileMenu}
                                open={Boolean(anchorEl)}>
                                <MenuItem
                                    disabled>{user?.profile?.given_name} {user?.profile?.family_name}</MenuItem>
                                <MenuItem onClick={handleProfileView}>
                                    My Profile
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                            </Menu>
                        </>}
                </Grid>
            </Grid>

            <Drawer
                variant="temporary"
                anchor={anchor}
                onClose={toggleDrawer(anchor, false)}
                open={state[anchor]}
                classes={{paper: appbarStyles.drawerPaper}}
                className={appbarStyles.drawer}>
                <div className={appbarStyles.drawerHeader}>
                    <IconButton style={{color: white}} onClick={toggleDrawer(anchor, false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>

                    <div className={appbarStyles.grow}/>

                    <MyVillageLogo style={{
                        height: 50,
                        margin: 10,
                        width: 'auto'
                    }}/>
                </div>
                <Divider style={{color: "white"}}/>

                <Box mt={2} mb={2} ml={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List>
                                <ListItem
                                    button
                                    onClick={() => handleProfileView()}
                                    alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={user?.profile?.given_name} src={user?.profile?.picture}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                style={{width: '95%'}}
                                                noWrap variant={"h6"}>
                                                {user?.profile?.given_name} {user?.profile?.family_name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                style={{width: '85%'}}
                                                noWrap
                                                component="div"
                                                variant="body2"
                                            >
                                                {user?.profile?.email}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="more">
                                            <ChevronRightIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Box>

                <Divider style={{color: "white"}}/>

                <List>
                    {
                        MainMenuItems ? MainMenuItems.map((item, index) => (
                            <ListItemLink handleClick={() => handleClick(item.url)} key={index}>
                                <ListItemText primary={item.label}/>
                            </ListItemLink>
                        )) : ""
                    }
                </List>

            </Drawer>

        </header>
    );
}