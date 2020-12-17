import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

import palette from "./palette";

const theme = createMuiTheme({
    overrides: {
      MuiCard: {
          root: {
              borderRadius: 8,
          }
      }
    },
    typography: {
        button: {
            textTransform: "uppercase",
            fontWeight: "inherit"
        }
    },
    palette
})

theme.props = {
    MuiLink: {

    }
}
export default responsiveFontSizes(theme)