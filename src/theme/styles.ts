import {makeStyles} from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import palette from "./palette";
import {orange, teal} from "@material-ui/core/colors";
import {white} from "./custom-colors";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import Africa from "../assets/images/africa.png"

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
        // background: palette.background.default,
        '&:hover': {
            // background: palette.background.dark
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
        width: 150,
        height: 150,
    },

    mediumAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
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
        maxHeight: 150,
        minHeight: '150px !important'
    },

    avatarPhotoIcon: {
        color: grey[500],
        position: "absolute",
        left: -40,
        bottom: 1
    },

    ellipsis: {
        maxWidth: '95%',
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        '&$:after': {
            content: '...'
        }
    },

    maxLines: {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        lineHeight: '1.5em',
        height: "3em",
        marginBottom: 15,
        verticalAlign: "middle",
        '&$:after': {
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
        minHeight: '45vh',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '35vh',
            minHeight: '25vh',
        }
    },

    whiteSpace: {
      whiteSpace: 'pre-line'
    },

    inline: {
        display: 'inline'
    },

    scrollable: {
        overflow: 'auto',
        height: 'calc(100vh - 70px)',
        [theme.breakpoints.down('sm')]: {
            padding: '0'
        }
    },

    scrollableDialog: {
        paddingBottom: 15,
        overflow: 'auto',
        height: 'calc(80vh - 70px)',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    bottomDesign:{
        marginBottom: '0', 
        position: 'absolute',
        bottom: '-0.5em',
        left: '0',
        right: '0',
        width: '100vw',
        height: '10vh',
        borderLeft: '45vw solid transparent',
        borderRight: '45vw solid transparent',
        borderBottom: `11.9vh solid ${palette.tertiary.light}`
    },
    leftBottomDesign:{
        marginBottom: '0', 
        position: 'absolute',
        bottom: '-0.5em',
        left: '0',
        width: '17vw',
        height: '4.5vh',
        backgroundImage: `linear-gradient(to left top, ${palette.tertiary.light}, ${palette.tertiary.main})`
    },
    rightBottomDesign:{
        marginBottom: '0', 
        position: 'absolute',
        bottom: '-0.5em',
        right: '0',
        width: '17vw',
        height: '4.5vh',
        backgroundImage: `linear-gradient(to left bottom, ${palette.tertiary.main}, ${palette.tertiary.light})`
    },
    largestText: {
        color: '#E98A2B', 
        fontWeight: 'bolder',
        marginRight: '20px',
    }


}))