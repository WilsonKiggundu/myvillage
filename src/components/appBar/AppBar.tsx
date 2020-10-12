import React, {useState} from "react";
import {
    AppBar,
    Badge,
    Button,
    colors,
    createStyles, Divider, Drawer,
    InputBase,
    Theme,
    Typography,
    useTheme,
    withStyles
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import {appBarStyles} from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import {AccountCircle, Image} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {globalStyles} from "../../theme/styles";
import {useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import AuthService from "../../modules/auth/AuthService";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import palette from "../../theme/palette";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItemLink from "../ListItemLink";

export default function ApplicationBar() {

    const authService = new AuthService()

    const styles = globalStyles();
    const classes = appBarStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.grow}>
            <AppBar style={{boxShadow: 'none'}} position="fixed">
                <Container maxWidth="lg" fixed>
                    <Toolbar>
                        <IconButton
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.hide)}
                            edge="start">
                            <MenuIcon color="secondary" />
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
                                <ListItemLink href="/profiles/startups">
                                    <ListItemText primary="Startups" />
                                </ListItemLink>
                                <ListItemLink href="/profiles/investors">
                                    <ListItemText primary="Investors" />
                                </ListItemLink>
                                <ListItemLink href="/events">
                                    <ListItemText primary="Events" />
                                </ListItemLink>
                                <ListItemLink href="/work-in-tech">
                                    <ListItemText primary="Work in Tech" />
                                </ListItemLink>
                            </List>
                        </div>
                        
                        {
                            authService.isAuthenticated() ? '' :
                                <div className={classes.sectionDesktop}>
                                    <Button className={`${styles.noShadow} ${styles.capitalize} ${styles.bold}`}
                                            variant="contained"
                                            style={{borderRadius: 25, marginLeft: 15, textTransform: "inherit"}}
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
                anchor="left"
                open={open}
                classes={{paper: classes.drawerPaper}}
                className={classes.drawer}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
            </Drawer>

        </div>
    );
}