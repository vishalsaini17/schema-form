import { createTheme } from "@mui/material";
import LinkBehavior from "../components/LinkBehavior";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#f2f2f2"
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default lightTheme