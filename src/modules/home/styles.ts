import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {white} from "../../theme/custom-colors";
import palette from "../../theme/palette";
import {teal} from "@material-ui/core/colors";

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
            //textAlign: 'center',
        }
    },

    scrollable: {
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 20,
        height: `calc(100vh - 80px)`,
        [theme.breakpoints.down('sm')]: {
            //padding: '0'
        }
    },

    link: {
        color: palette.primary.main,
        fontWeight: 'bold',
        fontSize: '1rem'
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
        width: 200,
        height: 'auto',
        marginBottom: 20,
        [theme.breakpoints.down("sm")]: {
            maxWidth: 150
        }
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
        color: white,
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
        // backgroundImage: `url(${Africa})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'bottom 100px right 100px',
        minHeight: '100vh',
        [theme.breakpoints.down("xs")]: {
            // backgroundPosition: 'bottom -100px right -100px'
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
    },

    // scrollable: {
    //     overflow: 'auto',
    //     marginTop: '-20px',
    //     height: 'calc(100vh - 70px)',
    //     [theme.breakpoints.down('sm')]: {
    //         padding: '0'
    //     }
    // },

}))