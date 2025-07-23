import { Children, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const themeContext = createContext(null);
const primaryColor = "#A6C2B3";
const secondaryColor = "#D4E6C1";
const ThemeProvider = ({ children }) => {
  const theme = { primaryColor, secondaryColor };
  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
};

export default ThemeProvider;
