import styles from "./Footer.module.css";
import Link from "../Link/Link.jsx";
import { useContext } from "react";
import ThemeContext from "../../Contexts/ThemeContext.jsx";
function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={`${styles["footer"]} ${styles[theme]}`}>
      <ul className={styles["links"]}>
        <li className={styles["link"]}>
          <img
            className={`${styles["github-logo"]} ${styles["logo"]}`}
            alt="Github logo"
          />
          <Link to={"https://github.com/gabrielhzgr"} target="_blank">
            Github
          </Link>
        </li>
        <li className={styles["link"]}>
          <img
            className={`${styles["linkedin-logo"]} ${styles["logo"]}`}
            alt="Linkedin logo"
          />
          <Link
            to={"https://www.linkedin.com/in/gabriel-hern%C3%A1ndez-a90936149/"}
            target="_blank"
          >
            Linkedin
          </Link>
        </li>
        <li className={styles["link"]}>
          <img
            className={`${styles["youtube-logo"]} ${styles["logo"]}`}
            alt="Youtube logo"
          />
          <Link to={"https://www.youtube.com/@gbrl10"} target="_blank">
            Youtube
          </Link>
        </li>
      </ul>
    </footer>
  );
}
export default Footer;
