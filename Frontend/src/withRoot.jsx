import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import palette from "./Theme/Palette";

// https://material-ui.com/customization/themes
// MuiThemeProvider 사용
const theme = createMuiTheme({
  palette,
  typography: {
    useNextVariants: true,
  },
});

const withRoot = (Component) => {
  const WithRoot = (props) => {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  };

  return WithRoot;
};

export default withRoot;
