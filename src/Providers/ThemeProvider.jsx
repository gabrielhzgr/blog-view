import { useState } from "react";
import ThemeContext from "../Contexts/ThemeContext.jsx";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function changeTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;
