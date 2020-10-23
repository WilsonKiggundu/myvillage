import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

import palette from "./palette";

const font = "'Montserrat', sans-serif";
const theme = createMuiTheme({
    overrides: {
      MuiCard: {
          root: {
              borderRadius: 8,
          }
      },
    },
    typography: {
        fontFamily: font,
        button: {
            textTransform: "none"
        }
    },
    palette
})
export default responsiveFontSizes(theme)