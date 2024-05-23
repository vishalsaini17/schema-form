import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { appDataSelector } from "../Redux/slices/appSlice";
import darkTheme from "./darkThemeConfig";
import lightTheme from "./lightThemeConfig";

const Theme = ({ children }) => {
  const { themeMode } = useSelector(appDataSelector);


  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline>
        {children}
      </CssBaseline>
    </ThemeProvider>
  );
}

export default Theme;