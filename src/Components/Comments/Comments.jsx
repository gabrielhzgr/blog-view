//import { useState } from "react";
import styles from "./Comments.module.css";
import Button from "../Button/Button.jsx";
import Error from "../Error/Error.jsx";
import Link from "../Link/Link.jsx";
import useComments from "../../Hooks/useComments.jsx";
import useReplies from "../../Hooks/useReplies.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import api from "../../api/api.js";
import { useOutletContext } from "react-router";
import { useRef, useState } from "react";

const FormPostComment = ({
  title,
  postId,
  comments,
  setComments,
  parentCommentId,
}) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const formComment = useRef(null);
  const auth = useAuth();

  console.log(parentCommentId, "parentId");

  function handlePostComment(e) {
    async function postComment(id, data) {
      const result = await api.comment.postComment(postId, data);

      if (result.error) {
        setError(result.error);
      }

      if (result.comment) {
        setComments([result.comment, ...comments]);
      }
      setPending(false);
      formComment.current.querySelector("textarea").value = "";
    }
    e.preventDefault();
    const content = formComment.current.querySelector("textarea").value;
    postComment(postId, { userId: auth.user.id, content, parentCommentId });
    setPending(true);
  }

  return (
    <form
      className={styles["post-comment"]}
      ref={formComment}
      onSubmit={handlePostComment}
    >
      {error ? <Error error={error} /> : null}
      <h2>{title}</h2>

      {!auth.user ? <p>You must login to post a comment</p> : null}
      {auth.user ? (
        <>
          <span className={styles["username"]}>
            <span className="material-symbols-outlined icon">person</span>
            {auth.user.username}
          </span>
          <textarea
            placeholder="Write your comment"
            name="content"
            rows={4}
            required
          ></textarea>
          {isPending ? (
            <Button className={`disabled ${styles["submit-button"]}`}>
              Submit
            </Button>
          ) : (
            <Button className={`${styles["submit-button"]}`}> Submit</Button>
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
            title={"Post a comment"}
            postId={postId}
            comments={comments}
            setComments={setComments}
            isReply={false}
          />
          <section className={styles["comments"]}>
            {comments.map((comment) => {
              const commentsKeys = {};

              if (!(comment.id in commentsKeys)) {
                commentsKeys[comment.id] = comment.id;
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                  />
                );
              }
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
  const updatedAt = `${new Date(comment.updatedAt).toLocaleDateString()} ${new Date(comment.createdAt).toLocaleTimeString()}`;
  const isCommentOwner = auth.user && comment.user.id == auth.user.id;
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [showReplies, setShowReplies] = useState(false);

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

  return (
    <article className={styles["comment"]}>
      {error ? <Error error={error} /> : null}
      <p className={styles["info"]}>
        <span className={styles["username"]}>
          {isCommentOwner ? (
            <span className="material-symbols-outlined icon">person</span>
          ) : null}
          {comment.user.username}
        </span>
        <span className={styles["updated-at"]}>{updatedAt}</span>

        {isCommentOwner && isPending ? (
          <Link className={`${styles["delete-link"]} disabled`}>Delete</Link>
        ) : null}
        {isCommentOwner && !isPending ? (
          <Link className={styles["delete-link"]} onClick={handleDelete}>
            Delete
          </Link>
        ) : null}
      </p>
      <p className={styles["content"]}>{comment.content}</p>
      {!showReplies ? (
        <Link
          onClick={() => {
            setShowReplies(true);
          }}
          className={styles["show-replies-link"]}
        >
          <span class="material-symbols-outlined">keyboard_arrow_down</span>
          Show replies
        </Link>
      ) : null}
      {showReplies ? (
        <>
          <Link
            onClick={() => {
              setShowReplies(false);
            }}
            className={styles["show-replies-link"]}
          >
            <span class="material-symbols-outlined">keyboard_arrow_down</span>
            Hide replies
          </Link>
          <Replies comment={comment} />
        </>
      ) : null}
    </article>
  );
};

const Replies = ({ comment }) => {
  const [page, setPage] = useState(1);
  const { replies, setReplies, isPending, error } = useReplies(
    comment.id,
    page,
  );

  function handleLoadMore() {
    setPage(page + 1);
  }
  return (
    <section className={styles["replies"]}>
      {error ? <Error error={error} /> : null}
      {replies ? (
        <>
          {replies.map((reply) => {
            return (
              <Comment
                comment={reply}
                comments={replies}
                setComments={setReplies}
              />
            );
          })}
          <FormPostComment
            title={"Reply"}
            postId={comment.postId}
            comments={replies}
            setComments={setReplies}
            parentCommentId={comment.id}
          />
        </>
      ) : null}
      {isPending ? <Skeleton /> : null}
      {isPending ? <Button onClick={handleLoadMore}>Load more</Button> : null}
    </section>
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
