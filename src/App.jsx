import Nav from "./Components/Nav/Nav.jsx";
import { useContext } from "react";
import ThemeContext from "./Contexts/ThemeContext.jsx";
import AuthContext from "./Contexts/AuthContext.jsx";
import { Outlet } from "react-router";
import Footer from "./Components/Footer/Footer.jsx";

import styles from "./App.module.css";

function App() {
  const { theme } = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <div className={`${styles["app"]} ${styles[theme]}`}>
      <Nav></Nav>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
