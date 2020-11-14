import {colors} from "@material-ui/core";

const white = "#FFFFFF";

const palette = {
    white: white,
    primary: {
        contrastText: white,
        dark: '#021835',
        main: '#1B314E',
        light: '#4E6481'
    },
    secondary: {
        contrastText: white,
        dark: '#DE7B04',
        main: '#F7941D',
        light: '#FFAE37'
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
    },
    background: {
        default: colors.grey[100],
        dark: colors.grey[200]
    }
}

export default palette