import {makeStyles} from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";

export const globalStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
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

    largeAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
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
}))