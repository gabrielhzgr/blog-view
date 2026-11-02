import { useEffect, useState } from "react";
import api from "../api/api";
function usePosts(page) {
  const [isPending, setPending] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  console.log(isPending, "pending");

  useEffect(() => {
    async function getPosts() {
      try {
        const result = await api.post.getPosts(page);
        if (result.error) {
          setError(result.error);
        }

        if (result.posts) {
          console.log(result.posts);

          if (page == 1) {
            setPosts(result.posts);
          } else {
            setPosts([...posts, ...result.posts]);
          }
        }
        setPending(false);
      } catch (err) {
        setError(err);
        setPending(false);
      }
    }
    getPosts();
  }, [page]);

  return { posts, isPending, setPending, error };
}

export default usePosts;
