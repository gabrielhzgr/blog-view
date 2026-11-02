//import { useState } from "react";
import styles from "./Comments.module.css";
import Button from "../Button/Button.jsx";
import useComments from "../../Hooks/useComments.jsx";
function Comments() {
  const { comments, isPending, error } = useComments();
  return (
    <section className={styles["comments"]}>
      <form className={styles["post-comment"]} action="">
        <h2>Post a comment</h2>
        <label htmlFor="username">
          <h3>username</h3>
          <input id="username" type="text" placeholder="@username" required />
        </label>
        <textarea placeholder="Write your comment" required></textarea>
        <Button>Submit</Button>
      </form>
    </section>
  );
}

export default Comments;
