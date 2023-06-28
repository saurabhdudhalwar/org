import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
      dark: "#3755BF",
      light: "#C1DEFC",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F2F9FF",
      dark: "#E2F1FF",
      light: "#EBF1F7",
      contrastText: "#fff",
    },
    error: { main: "#DC3445", dark: "#C93402", light: "#FBD6DD" },
    warning: {
      main: "#AD6500",
      dark: "#DF2320",
      light: "#F7EFA1",
      300: "#DBB492",
    },
    success: { main: "#34C384", dark: "#2E7D32", light: "#228158" },
    grey: {
      300: "#C7C7C7",
      400: "#B1B1B1",
      500: "#6E7691",
      600: "#6A6969",
      700: "#606060",
      800: "#5C5C5C",
      900: "#474747",
    },
    text: { primary: "#0C0B0B", secondary: "#6A6969" },
    background: {
      paper: "white",
      default: "#EBF1F7",
    },
  },
  shape: { borderRadius: 5 },
  mixins: { toolbar: { minHeight: "60px" } },
  typography: {
    fontFamily: "'Roboto', sans-serif ",
    h1: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "24px",
      fontWeight: 600,
      color: "#474747",
    },
    h2: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "16px",
      fontWeight: 600,
      color: "#474747",
    },
    h3: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "16px",
      fontWeight: 500,
      color: "#474747",
    },
    h4: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "14px",
      fontWeight: 600,
      color: "#474747",
    },
    h5: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "14px",
      fontWeight: 500,
      color: "#474747",
    },
    h6: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "12px",
      fontWeight: 500,
      color: "#474747",
    },
    subtitle1: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "18px",
      fontWeight: 600,
      color: "#474747",
    },
    subtitle2: {
      fontFamily: "'Roboto', sans-serif ",
      fontSize: "18px",
      fontWeight: 500,
      color: "#474747",
    },
    button: {
      textTransform: "none",
    },
  },

  // To make all variant level equal
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h1",
          h3: "h1",
          h4: "h1",
          h5: "h1",
          h6: "h1",
          subtitle1: "h1",
          subtitle2: "h1",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});

export default theme;
