import React, {useState} from "react";
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
import AuthService from "../../modules/auth/AuthService";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItemLink from "../ListItemLink";
import {MainMenuItems} from "./MainMenuItems";

type Anchor = 'left' | 'right';

export default function ApplicationBar() {

    const authService = new AuthService()

    const styles = globalStyles();
    const classes = appBarStyles();
    const theme = useTheme();

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

        setState({ ...state, [anchor]: open });
    };


    return (
        <div className={classes.grow}>
            <AppBar elevation={2} position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            onClick={toggleDrawer(anchor, true)}
                            className={clsx(classes.menuButton, classes.hide)}
                            edge="start">
                            <MenuIcon style={{color: 'white'}} />
                        </IconButton>
                        <Typography className={classes.title} variant="h5" noWrap>
                            MyVillage
                        </Typography>

                        {!authService.isAuthenticated() ?
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </div> : ""
                        }
                        <div className={classes.grow}/>

                        <div className={classes.sectionDesktop}>
                            <List className={classes.flexContainer}>

                                {
                                    MainMenuItems ? MainMenuItems.map(item => (
                                        <ListItemLink href={item.url}>
                                            <ListItemText primary={item.label} />
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
                                <IconButton aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <MailIcon/>
                                    </Badge>
                                </IconButton>
                                <IconButton aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon/>
                                    </Badge>
                                </IconButton>

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
                    <IconButton onClick={toggleDrawer(anchor, false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    MyVillage
                </div>
                <Divider />

                <List>
                    {
                        MainMenuItems ? MainMenuItems.map(item => (
                            <>
                                <ListItemLink alignItems="left" href={item.url}>
                                    <ListItemText primary={item.label} />
                                </ListItemLink>
                            </>
                        )) : ""
                    }
                </List>

            </Drawer>

        </div>
    );
}