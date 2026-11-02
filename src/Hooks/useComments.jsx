import { useState, useEffect } from "react";
import api from "../api/api.js";
function useComments(postId, page) {
  const [isPending, setPending] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  console.log(isPending, "pending");
  console.log(post, "post");

  useEffect(() => {
    async function getPost() {
      try {
        const result = await api.comment.getComments(postId, page);
        if (result.error) {
          setError(result.error);
        }

        if (result.post) {
          console.log(result.posts);

          setPost(result.post);
        }
        setPending(false);
      } catch (err) {
        setError(err);
        setPending(false);
      }
    }
    getPost();
  }, [page]);

  return { post, isPending, setPending, error };
}

export default useComments;
