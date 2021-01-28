import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {white} from "../../theme/custom-colors";
import palette from "../../theme/palette";
import {orange, teal} from "@material-ui/core/colors";
import Africa from "../../assets/images/africa.png";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,

        wrapper: {
            width: '100%',
            minHeight: 100,
            padding: 0,
            margin: 0
        },
        navyBg: {
            backgroundColor: '#1B314E',
            color: '#FFFFFF'
        }
    }))

export const homeStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: white,
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        position: 'absolute',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        }
    },

    scrollable: {
        overflow: 'auto',
        height: 'calc(100vh - 0)',
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },

    button: {
        boxShadow: 'none',
        textTransform: 'inherit',
        display: "block",
        width: '100%',
        borderRadius: 0,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        '&:hover': {
            backgroundColor: 'none'
        }
    },

    logo: {
        width: 150,
        height: 'auto',
        marginBottom: 20,
    },

    headline: {
        color: white,
        fontSize: '1.3rem'
    },

    subHeadline: {
        color: palette.secondary.main,
        fontSize: '1rem',
        padding: '45px 0'
    },

    container: {
        margin: '5% auto',
    },

    flex: {
        display: 'flex'
    },

    smallAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },

    largeAvatar: {
        width: 150,
        height: 150,
    },

    mediumAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    avatar: {
        backgroundColor: teal[900]
    },

    title: {
        textTransform: 'inherit',
        padding: '40px 0',
        color: orange[600],
        lineHeight: '4rem',
        fontSize: '4rem',
        [theme.breakpoints.down("xs")]: {
            fontSize: '2.5rem',
            lineHeight: '3rem'
        }
    },

    subtitle: {
        fontSize: '1.1rem'
    },

    main: {
        backgroundColor: palette.tertiary.main,
        backgroundImage: `url(${Africa})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom 100px right 100px',
        minHeight: '100vh',
        [theme.breakpoints.down("xs")]: {
            backgroundPosition: 'bottom -100px right -100px'
        }
    },

    footer: {
        backgroundColor: white,
        minHeight: '30vh',
        // borderTop: 'solid 2px orange'
    },

    buttons: {
        margin: '15% auto',
        textAlign: 'center'
    },

    img: {
        zIndex: theme.zIndex.drawer - 1,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    }

}))