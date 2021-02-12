import React, {MouseEvent, useState} from "react";
import {AppBar, Button, Divider, Drawer, Typography, useTheme} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {appBarStyles} from "./styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {globalStyles} from "../../theme/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItemLink from "../ListItemLink";
import {MainMenuItems} from "./MainMenuItems";
import {white} from "../../theme/custom-colors";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Urls} from "../../routes/Urls";

import {ReactComponent as Logo} from "../../assets/images/logo-white.svg"
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
import {KeyboardArrowUp} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import BackToTop from "../layout/BackToTop";

type Anchor = 'left' | 'right';

export default function ApplicationBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    const styles = globalStyles();
    const classes = appBarStyles();
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

    return (
        <>
            <AppBar elevation={0} position="absolute">
                <Container maxWidth="lg">
                    <Toolbar id="back-to-top-anchor" variant={"dense"} disableGutters>

                        <Logo style={{height: isMobile ? 35 : 50, width: 'auto', margin: isMobile ? 5 : 10}}/>

                        {isMobile ? <div className={classes.grow}/> : ""}

                        <IconButton
                            onClick={toggleDrawer(anchor, true)}
                            className={clsx(classes.menuButton, classes.hide)}
                            edge="start">
                            <MenuIcon style={{color: 'white'}}/>
                        </IconButton>

                        {!isMobile ? <div className={classes.grow}/> : ""}

                        <div className={classes.sectionDesktop}>
                            <List className={classes.flexContainer}>
                                {
                                    MainMenuItems ? MainMenuItems.map((item, index) => (
                                        <ListItemLink handleClick={() => handleClick(item.url)} key={index}>
                                            <ListItemText primary={item.label}/>
                                        </ListItemLink>
                                    )) : ""
                                }
                            </List>
                        </div>

                        {
                            user ? '' :
                                <div className={classes.sectionDesktop}>
                                    <Button className={`${styles.noShadow} ${styles.capitalize} ${styles.bold}`}
                                            variant="contained"
                                            style={{borderRadius: 30, marginLeft: 15, textTransform: "inherit"}}
                                            size="small"
                                            onClick={userManager.signinRedirect}
                                            color="secondary">
                                        Login
                                    </Button>
                                </div>
                        }

                        {user ?
                            <div className={classes.sectionDesktop}>
                                {user ? (
                                    <>
                                        <IconButton aria-controls="profile-menu"
                                                    aria-haspopup="true"
                                                    onClick={showProfileMenu}
                                                    color="inherit">
                                            <Avatar src={user?.profile?.picture} variant={"circular"}/>
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
                                    </>
                                ) : ""}

                            </div> : ""
                        }
                    </Toolbar>

                    <BackToTop>
                        <Fab color="secondary" size="large" aria-label="scroll back to top">
                            <KeyboardArrowUp/>
                        </Fab>
                    </BackToTop>
                </Container>
            </AppBar>

            <Drawer
                variant="temporary"
                anchor={anchor}
                onClose={toggleDrawer(anchor, false)}
                open={state[anchor]}
                classes={{paper: classes.drawerPaper}}
                className={classes.drawer}>
                <div className={classes.drawerHeader}>
                    <IconButton style={{color: white}} onClick={toggleDrawer(anchor, false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>

                    <div className={classes.grow}/>

                    <Logo style={{
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

        </>
    );
}