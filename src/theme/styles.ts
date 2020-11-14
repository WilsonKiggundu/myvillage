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
        width: theme.spacing(15),
        height: theme.spacing(15),
    },

    mediumAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
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
    }
}))