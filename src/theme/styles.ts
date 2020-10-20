import {makeStyles} from "@material-ui/core/styles";
import palette from "./palette";

export const globalStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    noShadow: {
        boxShadow: 'none'
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
    }
}))