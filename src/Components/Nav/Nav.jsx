import Link from "../Link/Link.jsx";
import { useContext } from "react";
import ThemeContext from "../../Contexts/ThemeContext.jsx";

import styles from "./Nav.module.css";
export default function Nav() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <nav className={`${styles["nav"]}`}>
      <h1 className={styles["main-title"]}>
        <Link to={"/"}>gabrielhzgr.dev</Link>
      </h1>

      <ul className={styles["actions"]}>
        <Link to={"#"}>
          <span
            onClick={changeTheme}
            className={`material-symbols-outlined clickable icon ${styles["theme-link"]} ${styles[theme]}`}
          >
            {theme == "light" ? "dark_mode" : "light_mode"}
          </span>
        </Link>

        <Link to={"/blogs"} className={styles["blogs-link"]}>
          Blogs
        </Link>

        <Link to={"/"} className={styles["login-link"]}>
          Login
        </Link>
      </ul>
    </nav>
  );
}
