import styles from "./Blogs.module.css";
import usePosts from "../../Hooks/usePosts";
import Error from "../../Components/Error/Error.jsx";
import { useState } from "react";
import Link from "../../Components/Link/Link.jsx";
import Button from "../../Components/Button/Button.jsx";
function Blogs() {
  const [page, setPage] = useState(1);
  const { posts, isPending, setPending, error } = usePosts(page);

  function loadMore() {
    setPending(true);
    setPage(page + 1);
  }

  return (
    <section className={styles["blogs"]}>
      {error ? <Error error={error} /> : null}
      {posts ? (
        <>
          {posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
          {!isPending ? <Button onClick={loadMore}>Load more</Button> : null}
        </>
      ) : null}
      {isPending ? <Skeleton /> : null}
    </section>
  );
}

const Post = ({ post }) => {
  return (
    <article className={styles["article"]}>
      <img src="" alt="" />
      <Link to={`/blogs/${post.id}`}>{post.title}</Link>
    </article>
  );
};

const Skeleton = () => {
  return (
    <>
      <article className={`${styles["article"]} loading`}></article>
      <article className={`${styles["article"]} loading`}></article>
      <article className={`${styles["article"]} loading`}></article>
    </>
  );
};

export default Blogs;
