import {colors} from "@material-ui/core";

const white = "#FFFFFF";

const palette = {
    white: white,
    primary: {
        contrastText: white,
        dark: '#021835',
        main: '#62cbc9',
        light: '#4E6481'
    },
    secondary: {
        contrastText: white,
        dark: '#ff9015',
        main: '#ff9015',
        light: '#ff9015'
    },
    tertiary: {
        contrastText: white,
        dark: '#636569',
        main: '#636569',
        light: '#636569'
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