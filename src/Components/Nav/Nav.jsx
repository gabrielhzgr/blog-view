import Link from "../Link/Link.jsx";
import { useContext } from "react";
import ThemeContext from "../../Contexts/ThemeContext.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import { useRef, useEffect } from "react";
import Button from "../Button/Button.jsx";
import Error from "../Error/Error.jsx";

import styles from "./Nav.module.css";

const FormLogin = ({ formRef }) => {
  const auth = useAuth();

  useEffect(() => {
    window.addEventListener("click", () => {
      if (formRef.classList.contains(styles["active"])) {
        formRef.classList.remove(styles["active"]);
      }
    });
  });

  function handleSubmit(e) {
    e.preventDefault();
    auth.setPending(true);
    const username = formRef.current.querySelector("#username").value;
    const password = formRef.current.querySelector("#password").value;
    auth.login({ username, password });
  }

  return (
    <form
      ref={formRef}
      className={`${styles["form-login"]} form-login`}
      onSubmit={handleSubmit}
    >
      {auth.error ? <Error error={auth.error} /> : null}
      <label htmlFor="username">
        Username
        <input id="username" type="text" placeholder="username" required />
      </label>

      <label htmlFor="password">
        Password
        <input id="password" type="text" placeholder="password" required />
      </label>
      {auth.isPending ? (
        <Button className={"disabled"}>Submit</Button>
      ) : (
        <Button>Submit</Button>
      )}
    </form>
  );
};
export default function Nav() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const auth = useAuth();
  const formLogin = useRef(null);
  const userInfoRef = useRef(null);

  function handleInfoClick(e) {
    e.preventDefault();
    userInfoRef.current.classList.toggle(styles["active"]);
    userInfoRef.current.focus();
  }

  function handleSignIn(e) {
    e.preventDefault();
    formLogin.current.classList.toggle(styles["active"]);
    formLogin.current.focus();
  }

  function handleLogout() {
    auth.logout();
  }

  return (
    <nav className={`${styles["nav"]} ${styles}`}>
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
        {auth.user ? (
          <Link onClick={handleInfoClick}>
            <span className="material-symbols-outlined icon">person</span>
            {auth.user.username}
          </Link>
        ) : (
          <Link onClick={handleSignIn}>Sign in</Link>
        )}
      </ul>
      {!auth.user ? <FormLogin formRef={formLogin} /> : null}
      {auth.user ? (
        <nav className={styles["user-info"]} ref={userInfoRef}>
          <Button onClick={handleLogout}>Logout</Button>
        </nav>
      ) : null}
    </nav>
  );
}
