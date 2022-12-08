import axios from "axios";
import { useEffect, useState } from "react";

interface IPost {
  userId: number;
  id: number;
  title: number;
  body: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(({ body, id, title }) => (
        <section key={id}>
          <h4>
            {id}. {title}
          </h4>
          <p>{body}</p>
        </section>
      ))}
    </div>
  );
};
