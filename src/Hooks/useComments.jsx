import { useState, useEffect } from "react";
import api from "../api/api.js";
function useComments(postId, page) {
  const [isPending, setPending] = useState(true);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const result = await api.comment.getComments(postId, page);
        if (result.error) {
          setError(result.error);
        }

        if (result.comments) {
          if (page == 1) {
            setComments(result.comments);
          } else {
            setComments([...comments, ...result.comments]);
          }
        }
        setPending(false);
      } catch (err) {
        setError(err);
        setPending(false);
      }
    }
    getPost();
  }, [page]);

  return { comments, setComments, isPending, setPending, error };
}

export default useComments;
