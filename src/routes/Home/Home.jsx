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
          post here. I will walk through some of the projects I make and share
          the findings and learnings I get when building<span>.</span>
        </p>
        <p>
          <span>T</span>hanks to The Odin Project, for all the lectures they
          share with us<span>.</span>
        </p>
      </section>
    </section>
  );
}

export default Home;
