import React, {MouseEvent, useState} from "react";
import {Badge, Divider, Drawer, ListItemIcon, ListSubheader, Toolbar, Typography, useTheme} from "@material-ui/core";
import {appBarStyles} from "./styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ListItemLink from "../ListItemLink/ListItemLink";
import Avatar from "@material-ui/core/Avatar";
import {Urls} from "../../routes/Urls";
import MenuIcon from '@material-ui/icons/Menu';

import {ReactComponent as MyVillageLogo} from "../../assets/images/mv-colored-logo.svg"
import {ReactComponent as MyVillageIcon} from "../../assets/images/favicon.svg"
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {User} from "oidc-client";
import userManager from "../../utils/userManager";
import {USER_SIGNED_OUT} from "redux-oidc";
import {useHistory} from "react-router-dom";
import {userSelector} from "../../data/coreSelectors";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';

import './AppBar.css'
import makeStyles from "@material-ui/core/styles/makeStyles";
import XAsyncTypeahead from "../XAsyncTypeahead";
import LayersIcon from "@material-ui/icons/Layers";
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import MoneyIcon from '@material-ui/icons/Money'
import WorkIcon from '@material-ui/icons/Work';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import LoginIcon from '@material-ui/icons/VpnKey';
import CodeIcon from '@material-ui/icons/Code';
import BookIcon from '@material-ui/icons/Book';
import {white} from "../../theme/custom-colors";
import Button from "@material-ui/core/Button";
import {Notifications} from "@material-ui/icons";

type Anchor = 'left' | 'right';
const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    appBar: {
        backgroundColor: "#1C1C1C",
        color: "#FFFFFF",
        width: "100%",
        position: "fixed",
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function ApplicationBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    const classes = useStyles();
    const appbarStyles = appBarStyles()
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const user: User = useSelector(userSelector)
    const isAuthenticated = user != null


    const [profileMenuEl, setProfileMenuEl] = React.useState<null | HTMLElement>(null);
    const showProfileMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setProfileMenuEl(event.currentTarget)
    }

    const [communityMenuEl, setCommunityMenuEl] = React.useState<null | HTMLElement>(null);
    const showCommunityMenu = (event: MouseEvent<HTMLElement>) => {
        setCommunityMenuEl(event.currentTarget)
    }

    const closeMenu = () => {
        setProfileMenuEl(null)
        setCommunityMenuEl(null)
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
        closeMenu()
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

    return (
        <>

            <header className={classes.appBar}>

                <Grid container spacing={2} justify={"space-between"}>
                    <Grid xs={1} sm={2} md={3} lg={3} item>
                        <div className="Appbar-menu-icon-wrapper">
                            <MenuIcon
                                onClick={toggleDrawer(anchor, true)}
                                className="Appbar-menu-icon"/>
                            {!isMobile && <MyVillageLogo className="Appbar-logo"/>}
                        </div>
                    </Grid>
                    <Grid xs={9} sm={8} md={6} lg={6} item>
                        <div className="Appbar-searchbox">
                            <XAsyncTypeahead
                                placeholder="What are you looking for?"/>
                        </div>
                    </Grid>
                    <Grid xs={2} sm={2} md={3} lg={3} item>
                        {isMobile ? <MyVillageIcon className="Appbar-logo-right"/> :
                            <div className="Appbar-icons-wrapper">
                                <div className="Appbar-right-icons">
                                    <Badge onClick={() => window.location.replace(Urls.events)}
                                           className="icon" color={"secondary"}>
                                        <EventIcon/>
                                    </Badge>
                                    <Badge
                                        onClick={() => window.location.replace(Urls.jobs.home)}
                                        className="icon" color={"secondary"}>
                                        <WorkIcon/>
                                    </Badge>
                                    <Badge
                                        onClick={() => window.location.replace(Urls.profiles.freelancers)}
                                        className="icon" color={"default"}>
                                        <CodeIcon/>
                                    </Badge>

                                    {
                                        !user && <Badge
                                            onClick={handleLogin}
                                            className="icon" color={"secondary"}>
                                            <LoginIcon/>
                                        </Badge>
                                    }

                                </div>
                            </div>
                        }

                    </Grid>
                </Grid>

            </header>

            <Drawer
                variant={"temporary"}
                anchor={anchor}
                onClose={toggleDrawer(anchor, false)}
                open={state[anchor]}
                classes={{paper: appbarStyles.drawerPaper}}
                className={appbarStyles.drawer}>
                <Toolbar style={{padding: 0}} variant={"dense"}>
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
                </Toolbar>

                {
                    isAuthenticated &&
                    <Box ml={1}>
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

                <Divider/>

                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Menu
                        </ListSubheader>
                    }
                >
                    <ListItemLink slag={"feed"} handleClick={() => handleClick(Urls.feed)}>
                        <ListItemIcon>
                            <DynamicFeedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Feed"}/>
                    </ListItemLink>

                    <ListItemLink slag={"blog"} handleClick={() => handleClick(Urls.blog)}>
                        <ListItemIcon>
                            <BookIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Blog"}/>
                    </ListItemLink>

                    <ListItemLink slag={"community"} handleClick={() => handleClick(Urls.profiles.people)}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Community"}/>
                    </ListItemLink>

                    <ListItemLink slag={"freelancers"} handleClick={() => handleClick(Urls.profiles.freelancers)}>
                        <ListItemIcon>
                            <AllInclusiveIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Freelancers"}/>
                    </ListItemLink>
                    <ListItemLink slag={"developers"} handleClick={() => handleClick(Urls.profiles.developers)}>
                        <ListItemIcon>
                            <CodeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Developers"}/>
                    </ListItemLink>

                    <ListItemLink slag={"startups"} handleClick={() => handleClick(Urls.profiles.startups)}>
                        <ListItemIcon>
                            <LayersIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Startups"}/>
                    </ListItemLink>

                    <ListItemLink slag={"jobs"} handleClick={() => handleClick(Urls.jobs.list)}>
                        <ListItemIcon>
                            <WorkIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Work in Tech"}/>
                    </ListItemLink>

                    <ListItemLink slag={"events"} handleClick={() => handleClick(Urls.events)}>
                        <ListItemIcon>
                            <EventIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Events"}/>
                    </ListItemLink>

                    <Divider/>

                </List>

                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Investors
                        </ListSubheader>
                    }
                >
                    <ListItemLink slag={"investors/readiness"} handleClick={() => handleClick(Urls.investors.readiness)}>
                        <ListItemIcon>
                            <MoneyIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Investor Readiness"}/>
                    </ListItemLink>
                </List>

                <Divider/>

                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Settings
                        </ListSubheader>
                    }
                >

                    <ListItemLink slag={"email-settings"}
                                  handleClick={() => handleClick(Urls.settings.emailNotifications)}>
                        <ListItemIcon>
                            <Notifications/>
                        </ListItemIcon>
                        <ListItemText primary={"Email Preferences"}/>
                    </ListItemLink>

                </List>

                <Divider/>

                <Box mt={2} mb={2} ml={2} mr={2}>
                    {
                        user ?
                            <Button disableElevation
                                    onClick={handleLogout}
                                    style={{width: '100%'}}
                                    variant={"contained"}
                                    color={"inherit"}
                                    size={"large"}>Logout</Button> :
                            <Button disableElevation
                                    onClick={handleLogin}
                                    style={{width: '100%'}}
                                    variant={"contained"}
                                    color={"secondary"}
                                    size={"large"}>Login</Button>
                    }
                </Box>

            </Drawer>
        </>

    );
}
