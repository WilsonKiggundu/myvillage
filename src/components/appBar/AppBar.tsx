import React, {MouseEvent, useEffect, useState} from "react";
import {Button, Divider, Drawer, Typography, useTheme} from "@material-ui/core";
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
import {Urls} from "../../routes/Urls";

import {ReactComponent as MyVillageLogo} from "../../assets/images/mv-colored-logo.svg"
import {ReactComponent as MyVillageIcon} from "../../assets/images/favicon.svg"
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
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';

import './AppBar.css'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuIcon from "@material-ui/icons/Menu";
import XAsyncTypeahead from "../XAsyncTypeahead";
import {MoreHoriz} from "@material-ui/icons";

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

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const user: User = useSelector(userSelector)
    const isAuthenticated = user != null

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

    const handleLogin = async () => {
        await userManager.signinRedirect({state: window.location.pathname + window.location.search})
    }

    const handleLogout = async () => {
        dispatch({
            type: USER_SIGNED_OUT
        })
        await userManager.signoutRedirect({
            id_token_hint: user.id_token
        })

        await userManager.removeUser()
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
        // if (locationArray.includes('freelancers')) setActiveMenu('freelancers')
        if (locationArray.includes('developers')) setActiveMenu('developers')
    })

    return (
        <header className="Appbar-root">

            <Grid spacing={2} container>
                <Grid xs={1} lg={1} item>
                    {
                        isMobile ?
                            <MyVillageIcon className="Appbar-logo"/> :
                            <MyVillageLogo className="Appbar-logo"/>
                    }
                </Grid>
                <Grid xs={9} lg={3} item>
                    <div className="Appbar-searchbox">
                        <XAsyncTypeahead
                            placeholder="What are you looking for?"/>
                    </div>
                </Grid>
                {!isMobile && <Grid style={{textAlign: "right"}} lg={7} item>
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
                            <a href={Urls.jobs.home}>Work in tech</a>
                        </li>

                        {/*<li>*/}
                        {/*    <a href="#">*/}
                        {/*        <MoreVert />*/}
                        {/*    </a>*/}
                        {/*    <div className="dropdown">Here is a div that is white</div>*/}
                        {/*</li>*/}

                        {/*<li className={activeMenu === 'freelancers' ? 'active' : ''}>*/}
                        {/*    <a href={Urls.profiles.freelancers}>Freelancers</a>*/}
                        {/*</li>*/}
                        <li className={activeMenu === 'developers' ? 'active' : ''}>
                            <a href={Urls.profiles.developers}>Developers</a>
                        </li>
                    </ul>
                </Grid>}
                <Grid xs={1} item>
                    {isMobile ?
                        <div className="Appbar-profile">
                            <Button onClick={toggleDrawer(anchor, true)}
                                    color={"secondary"}
                                    variant={"contained"}>
                                <MenuIcon className="Appbar-menu-icon"/>
                            </Button>
                        </div> :
                        user ?
                            <div className="Appbar-login-button">
                                <Button
                                    onClick={handleProfileView}
                                    variant={"text"}
                                    color={"secondary"}>
                                    <Avatar src={user.profile.picture}>
                                        {user.profile?.given_name ? user.profile.given_name[0].toUpperCase() : ''}
                                    </Avatar>
                                </Button>
                            </div> :
                            <div className="Appbar-login-button">
                                <Button
                                    onClick={handleLogin}
                                    variant={"outlined"}
                                    color={"secondary"}>Login</Button>
                            </div>
                    }
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

                {
                    isAuthenticated &&
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
                }

                <Divider style={{color: "white"}}/>

                <List>
                    {
                        MainMenuItems ? MainMenuItems.map((item, index) => (
                            <ListItemLink handleClick={() => handleClick(item.url)} key={index}>
                                <ListItemText primary={item.label}/>
                            </ListItemLink>
                        )) : ""
                    }

                    <Divider />

                    {user && <ListItemLink handleClick={handleLogout}>
                        <ListItemText primary={"Logout"} />
                    </ListItemLink>}
                </List>

            </Drawer>

        </header>
    );
}