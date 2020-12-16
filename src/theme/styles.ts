import {makeStyles} from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import palette from "./palette";
import {teal} from "@material-ui/core/colors";
import {white} from "./custom-colors";
import grey from "@material-ui/core/colors/grey";

export const globalStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },

    flexWrap: {
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },

    clickable: {
        cursor: 'pointer',
        background: palette.background.default,
        '&:hover': {
            background: palette.background.dark
        }
    },

    rounded: {
        borderRadius: 25
    },

    fullWidth: {
      width: '100%'
    },

    noShadow: {
        boxShadow: 'none'
    },

    borderless: {
      border: 0
    },

    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },

    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },

    center: {
        margin: 'auto'
    },
    centerAvatar: {
        margin: 'auto  auto 10px auto',
    },

    smallAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },

    largeAvatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },

    mediumAvatar: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },

    flex: {
        flexGrow: 1
    },

    bold: {
        fontWeight: 'bold'
    },

    capitalize: {
        textTransform: 'none'
    },

    bottomMargin: {
        marginBottom: 20
    },

    rounderImage: {
        borderRadius: '100%',
        width: 150,
        height: 150,
        borderStyle: 'solid',
        borderColor: 'white',
        borderSize: 2
    },

    profilePhoto: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        maxHeight: 200,
        borderRadius: '1%',
        padding: 15,
        textAlign: 'center',
        //backgroundColor: palette.primary.main
    },

    tile: {
        borderRadius: 0
    },

    flat: {
        boxShadow: 'none',
    },

    avatar: {
        backgroundColor: teal[900]
    },

    textCenter: {
        textAlign: 'center'
    },

    dropzone: {
        maxHeight: 100
    },

    avatarPhotoIcon: {
        color: grey[500],
        position: "absolute",
        left: -40,
        bottom: 1
    },

    maxLines: {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        lineHeight: '1.5em',
        height: "3em",
        verticalAlign: "middle",
        '&$:after' : {
            content: '...'
        }
    },

    video: {
        width: '100% !important',
        height: 'auto !important'
    },

    coverPhoto: {
        // borderBottomLeftRadius: 8,
        // borderBottomRightRadius: 8,
        position: 'relative',
        backgroundColor: grey[100],
        width: '100%',
        maxHeight: '45vh',
        minHeight: '20vh',
        overflow: 'hidden',
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            height: '25vh'
        }
    }

}))

export const homeStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: white,
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        position: 'absolute'
    },

    button: {
        boxShadow: 'none',
        textTransform:'inherit',
        display: "block",
        width: '80%',
        borderRadius: 8
    },

    logo: {
        width: 300,
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
        margin: '10% auto',
    },

    flex: {
        display: 'flex'
    },

    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: '25px 0',
        fontSize: '1.3rem'
    },

    subtitle: {
        fontSize: '1.1rem'
    },

    main: {
        backgroundColor: palette.tertiary.main,
        minHeight: '50vh'
    },

    footer: {
        backgroundColor: white,
        minHeight: '30vh'
    },

    buttons: {
        margin: '15% auto'
    }

}))