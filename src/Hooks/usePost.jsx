import { useEffect, useState } from "react";
import api from "../api/api";
function usePost(id) {
  const [isPending, setPending] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const result = await api.post.getPost(id);
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
  }, []);

  return { post, isPending, setPending, error };
}

export default usePost;
