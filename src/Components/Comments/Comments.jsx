//import { useState } from "react";
import styles from "./Comments.module.css";
import Button from "../Button/Button.jsx";
import Error from "../Error/Error.jsx";
import useComments from "../../Hooks/useComments.jsx";
import api from "../../api/api.js";
import { useOutletContext } from "react-router";
import { useRef, useState } from "react";

const FormPostComment = ({ postId, comments, setComments }) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const formComment = useRef(null);

  function handlePostComment() {
    async function postComment(data) {
      const result = await api.comment.postComment(postId, data);
      if (result.error) {
        setError(result.error);
      }

      if (result.comment) {
        setComments([result.comment, ...comments]);
      }
      setPending(false);
    }

    const content = formComment.current.querySelector("textarea").value;
    postComment({ userId: "", postId, content });
    setPending(true);
  }

  return (
    <form
      className={styles["post-comment"]}
      ref={formComment}
      onSubmit={handlePostComment}
    >
      {error ? <Error error={error} /> : null}
      <h2>Post a comment</h2>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        required
      />
      <textarea
        placeholder="Write your comment"
        name="content"
        rows={4}
        required
      ></textarea>
      {isPending ? (
        <Button disabled={true}>Submit</Button>
      ) : (
        <Button>Submit</Button>
      )}
    </form>
  );
};

function Comments() {
  const { postId } = useOutletContext();
  const [page, setPage] = useState(1);
  const { comments, setComments, isPending, setPending, error } = useComments(
    postId,
    page,
  );

  function loadMoreComments() {
    setPage(page + 1);
    setPending(true);
  }

  return (
    <section className={styles["comment-section"]}>
      {error ? <Error error={error} /> : null}
      {comments ? (
        <>
          <FormPostComment
            postId={postId}
            comments={comments}
            setComments={setComments}
          />
          <section className={styles[comments]}>
            {comments.map((comment) => {
              return <Comment comment={comment} />;
            })}
            {!isPending ? (
              <Button onClick={loadMoreComments}>Load more</Button>
            ) : null}
          </section>
        </>
      ) : null}
      {isPending ? <Skeleton /> : null}
    </section>
  );
}

const Comment = ({ comment }) => {
  return (
    <article className={styles["comment"]}>
      <p className={styles["info"]}>
        <span>{comment.username}</span>
        <span>{comment.createdAt}</span>
      </p>
      <p className={styles["content"]}>{comment.content}</p>
    </article>
  );
};

const Skeleton = () => {
  return (
    <section className={`${styles["comment-section"]}`}>
      <article className={`${styles["comment"]}`}>
        <p className={`${styles["info"]} loading`}></p>
        <p className={`${styles["content"]} loading`}></p>
      </article>
      <article className={`${styles["comment"]}`}>
        <p className={`${styles["info"]} loading`}></p>
        <p className={`${styles["content"]} loading`}></p>
      </article>
      <article className={`${styles["comment"]}`}>
        <p className={`${styles["info"]} loading`}></p>
        <p className={`${styles["content"]} loading`}></p>
      </article>
    </section>
  );
};

export default Comments;
