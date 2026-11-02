import { useParams } from "react-router";
import usePost from "../../Hooks/usePost";
import Error from "../../Components/Error/Error";
import styles from "./Blog.module.css";
import { Outlet } from "react-router";
import Button from "../../Components/Button/Button.jsx";
import { useNavigate } from "react-router";
function Blog() {
  const { id } = useParams();
  const { post, isPending, error } = usePost(id);
  const navigate = useNavigate();

  return (
    <>
      {error ? <Error error={error} /> : null}
      {isPending ? <Skeleton /> : null}
      {post ? (
        <section className={styles["blog"]}>
          <section
            className={styles["blog"]}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></section>
          <Button
            className={styles["load-comments"]}
            onClick={() => {
              navigate("comments");
            }}
          >
            Load comments
          </Button>
          <Outlet></Outlet>
        </section>
      ) : null}
    </>
  );
}

const Skeleton = () => {
  return (
    <section className={`${styles["blog"]} ${styles["loading"]}`}>
      <h1 className="loading"></h1>

      <section className={styles["teaser"]}>
        <span className={`material-symbols-outlined ${styles["img"]}`}>
          image
        </span>
        <aside className={`${styles["aside"]} loading`}></aside>
      </section>
      <section className={styles["content"]}>
        <p className="loading"></p>
        <p className="loading"></p>
        <p className="loading"></p>
        <p className="loading"></p>
        <p className="loading"></p>
      </section>
    </section>
  );
};

export default Blog;
