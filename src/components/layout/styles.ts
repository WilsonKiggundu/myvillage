import grey from "@material-ui/core/colors/grey";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {themeBackground, white} from "../../theme/custom-colors";

export const drawerWidth = 240;
export const navBackgroundColor = grey[900];
export const useLayoutStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: "100%",
            backgroundColor: white
        },
        drawer: {
            backgroundColor: navBackgroundColor,
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
            backgroundColor: themeBackground,
        },
        title: {
            flexGrow: 1,
        },
        menuButton: {
            color: grey[50],
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        toolbar: {
            ...theme.mixins.toolbar,
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: navBackgroundColor,
        },
        content: {
            flexGrow: 1,
            // height: "100%",
        },

        scrollable: {
            overflowY: 'auto',
            overflowX: 'hidden',
            marginTop: '-20px',
            paddingTop: 20,
            height: 'calc(100vh - 60px)',
            [theme.breakpoints.down('sm')]: {
                //padding: '0'
            }
        },

        body: {
            backgroundColor: grey[50],
            padding: theme.spacing(0),
            margin: theme.spacing(0),
            [theme.breakpoints.only('xs')]: {
                padding: 0,
            },
            height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
            [theme.breakpoints.up('sm')]: {
                height: `calc(100% - 64px)`
            },
            overflow: 'auto'
        },
        bodyPadded: {
            backgroundColor: grey[50],
            padding: theme.spacing(2),
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing(1),
            },
            height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
            [theme.breakpoints.up('sm')]: {
                height: `calc(100% - 64px)`
            },
            overflow: 'auto'
        },
        logoHolder: {
            flexGrow: 1,
        },

        menu: {
            color: grey[500]
        },

        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },

        fullWidth: {
            flexGrow: 1,
            width: '100%'
        },

        footer: {
            width: "100%",
            flexGrow: 1,
            textAlign: "center"
        }
    }),
);