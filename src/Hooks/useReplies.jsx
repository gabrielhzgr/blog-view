import { useState, useEffect } from "react";
import api from "../api/api.js";
function useReplies(commentId, page) {
  const [isPending, setPending] = useState(true);
  const [replies, setReplies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const result = await api.comment.getReplies(commentId, page);
        if (result.error) {
          setError(result.error);
        }

        if (result.replies) {
          if (page == 1) {
            setReplies(result.replies);
          } else {
            setReplies([...replies, ...result.replies]);
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

  return { replies, setReplies, isPending, setPending, error };
}

export default useReplies;
