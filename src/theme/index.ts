import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

import palette from "./palette";

const font = "'Lora', sans-serif";
const theme = createMuiTheme({
    overrides: {
      MuiCard: {
          root: {
              borderRadius: 8,
          }
      }
    },
    typography: {
        fontFamily: font,
        button: {
            textTransform: "none"
        }
    },
    palette
})

theme.props = {
    MuiLink: {

    }
}
export default responsiveFontSizes(theme)