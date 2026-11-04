import { useState } from "react";
import ThemeContext from "../Contexts/ThemeContext.jsx";

function ThemeProvider({ children }) {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme ?? "dark");

  function changeTheme() {
    if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;
