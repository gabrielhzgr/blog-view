//import { useState } from "react";
import styles from "./Comments.module.css";
import Button from "../Button/Button.jsx";
import Error from "../Error/Error.jsx";
import useComments from "../../Hooks/useComments.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import api from "../../api/api.js";
import { useOutletContext } from "react-router";
import { useRef, useState } from "react";

const FormPostComment = ({ postId, comments, setComments }) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const formComment = useRef(null);
  const auth = useAuth();

  function handlePostComment(e) {
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
    e.preventDefault();
    const content = formComment.current.querySelector("textarea").value;
    postComment({ userId: auth.user.id, postId, content });
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

      {!auth.user ? <p>You must login to post a comment</p> : null}
      {auth.user ? (
        <>
          <span className={styles["username"]}>
            <span class="material-symbols-outlined icon">person</span>
            {auth.user.username}
          </span>
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
        </>
      ) : null}
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

  console.log(comments);

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
          <section className={styles["comments"]}>
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              );
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

const Comment = ({ comment, setComments, comments }) => {
  const auth = useAuth();
  const updatedAt = `${new Date(comment.updatedAt).toLocaleDateString()} ${new Date(comment.createAt).toLocaleTimeString()}`;
  const isCommentOwner = comment.user.id == auth.user.id;
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);

  function handleDelete() {
    async function deleteComment(id) {
      try {
        const result = await api.comment.deleteComment(id);
        if (result.error) {
          setError(result.error);
        }

        if (result.comment) {
          setComments(
            comments.filter((comment) => {
              return comment.id !== id;
            }),
          );
        }
        setPending(false);
      } catch (err) {
        setError(err);
        setPending(false);
      }
    }

    setPending(true);
    deleteComment(comment.id);
  }

  console.log(isCommentOwner, "owner");
  console.log(isPending, "pending");

  return (
    <article className={styles["comment"]}>
      {error ? <Error error={error} /> : null}
      <p className={styles["info"]}>
        <span className={styles["username"]}>
          {isCommentOwner ? (
            <span class="material-symbols-outlined icon">person</span>
          ) : null}
          {comment.user.username}
        </span>
        <span className={styles["updated-at"]}>{updatedAt}</span>

        {isCommentOwner && isPending ? (
          <Button
            className={styles["delete-button"]}
            onClick={handleDelete}
            disabled={true}
          >
            <span class="material-symbols-outlined">delete</span>
            Delete
          </Button>
        ) : null}
        {isCommentOwner && !isPending ? (
          <Button className={styles["delete-button"]} onClick={handleDelete}>
            <span class="material-symbols-outlined">delete</span>
            Delete
          </Button>
        ) : null}
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
