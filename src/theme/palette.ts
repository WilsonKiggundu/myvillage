import {colors} from "@material-ui/core";

const white = "#FFFFFF";

const palette = {
    white: white,
    primary: {
        contrastText: white,
        dark: '#1C1C1C',
        main: '#1C1C1C',
        light: '#1C1C1C'
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
        main: '#1C1C1C',
        light: '#2C2A2A'

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