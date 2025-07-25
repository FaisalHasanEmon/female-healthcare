import { useContext } from "react";
import { themeContext } from "../context/ThemeProvider";

const UseTheme = () => {
  const theme = useContext(themeContext);
  return theme;
};
export default UseTheme;
