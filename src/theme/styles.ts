import {makeStyles} from "@material-ui/core/styles";

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
    }
}))