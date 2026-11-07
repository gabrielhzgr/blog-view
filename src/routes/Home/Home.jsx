import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles["home"]}>
      <section>
        <p>
          <span>W</span>elcome to my blog, I will post content related to
          programming here, mainly about Web development<span>.</span>
        </p>
        <p>
          <span>H</span>ope you can find something useful on the blogs that I
          post here<span>.</span>
        </p>
        <p>
          <span>I</span> will walk through some of the projects I make and share
          the findings and learnings I got from building them<span>.</span>
        </p>
        <p>
          <span>T</span>hanks to The Odin Project, for all the lectures and
          resources<span>.</span>
        </p>
      </section>
    </section>
  );
}

export default Home;
