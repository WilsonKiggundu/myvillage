import React, {useState, MouseEvent} from "react";
import {useHistory} from "react-router-dom"
import {
    AppBar,
    Badge,
    Button,
    Divider, Drawer,
    InputBase,
    Typography,
    useTheme
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {appBarStyles} from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {globalStyles} from "../../theme/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../../services/AuthService";
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
import {getProfile, getUser} from "../../services/User";

import {ReactComponent as Logo} from "../../assets/images/logo-white.svg"
import {IProfile} from "../../interfaces/IProfile";

type Anchor = 'left' | 'right';

export default function ApplicationBar() {

    const authService = new AuthService()

    const styles = globalStyles();
    const classes = appBarStyles();
    const theme = useTheme();

    const history = useHistory()
    const user: IProfile = getProfile()

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
        history.push(Urls.profiles.onePerson(user.userId))
    }


    return (
        <div className={classes.grow}>
            <AppBar elevation={0} position="fixed">
                <Container maxWidth={false}>
                    <Toolbar disableGutters>
                        <IconButton
                            onClick={toggleDrawer(anchor, true)}
                            className={clsx(classes.menuButton, classes.hide)}
                            edge="start">
                            <MenuIcon style={{color: 'white'}}/>
                        </IconButton>

                        <Logo style={{height: 50, width: 'auto', margin: '10px'}}/>

                        {/*{authService.isAuthenticated() ?*/}
                        {/*    <div className={classes.search}>*/}
                        {/*        <div className={classes.searchIcon}>*/}
                        {/*            <SearchIcon/>*/}
                        {/*        </div>*/}
                        {/*        <InputBase*/}
                        {/*            placeholder="Search…"*/}
                        {/*            classes={{*/}
                        {/*                root: classes.inputRoot,*/}
                        {/*                input: classes.inputInput,*/}
                        {/*            }}*/}
                        {/*            inputProps={{'aria-label': 'search'}}*/}
                        {/*        />*/}
                        {/*    </div> : ""*/}
                        {/*}*/}


                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <List className={classes.flexContainer}>
                                {
                                    MainMenuItems ? MainMenuItems.map((item, index) => (
                                        <ListItemLink key={index} href={item.url}>
                                            <ListItemText primary={item.label}/>
                                        </ListItemLink>
                                    )) : ""
                                }
                            </List>
                        </div>

                        {
                            authService.isAuthenticated() ? '' :
                                <div className={classes.sectionDesktop}>
                                    <Button className={`${styles.noShadow} ${styles.capitalize} ${styles.bold}`}
                                            variant="contained"
                                            style={{borderRadius: 30, marginLeft: 15, textTransform: "inherit"}}
                                            size="small"
                                            onClick={authService.signinRedirect}
                                            color="secondary">
                                        Login
                                    </Button>
                                </div>
                        }

                        {authService.isAuthenticated() ?
                            <div className={classes.sectionDesktop}>
                                <IconButton aria-controls="profile-menu"
                                            aria-haspopup="true"
                                            onClick={showProfileMenu}
                                            color="inherit">
                                    <Avatar src={""} variant={"circular"}/>
                                </IconButton>
                                <Menu
                                    id="profile-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    getContentAnchorEl={null}
                                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                                    onClose={closeProfileMenu}
                                    open={Boolean(anchorEl)}>
                                    <MenuItem disabled>{user.firstName} {user.lastName}</MenuItem>
                                    <MenuItem onClick={handleProfileView}>
                                        My Profile
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={() => authService.logout()}>Logout</MenuItem>
                                </Menu>

                            </div> : ""
                        }
                    </Toolbar>
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
                    <Logo />
                </div>
                <Divider style={{color: "white"}}/>

                <List>
                    {
                        MainMenuItems ? MainMenuItems.map((item, index) => (
                            <ListItemLink key={index} href={item.url}>
                                <ListItemText primary={item.label}/>
                            </ListItemLink>
                        )) : ""
                    }
                </List>

            </Drawer>

        </div>
    );
}