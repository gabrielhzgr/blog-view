import styles from "./Error.module.css";
function Error({ error }) {
  return (
    <section className={styles["error"]}>
      <h1>{error.name}</h1>
      <p>{error.message || error.statusText}</p>
    </section>
  );
}

export default Error;
