import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface IPost {
  userId: number;
  id: number;
  title: number;
  content: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [post, setPost] = useState<IPost>();

  const baseURl = "http://localhost:8081/posts";

  useEffect(() => {
    axios
      .get(baseURl)
      .then((response) => setPosts(response.data))
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURl}/1`)
      .then((response) => setPost(response.data))
      .catch((error) => alert(error));
  }, []);

  const createPost = useCallback(() => {
    axios
      .post(baseURl, {
        userId: 1,
        title: "New Post Update " + Math.floor(Math.random() * 100),
        body: "This is a new Post",
      })
      .then((response) => {
        setPost(response.data);
      });

    !post && "No post";
  }, []);

  const updatePost = useCallback(() => {
    axios
      .put(`${baseURl}/1`, {
        title: Math.random(),
      })
      .then((response) => {
        setPost(response.data);
      });
  }, []);

  const deletePost = useCallback(() => {
    axios.delete(`${baseURl}/1`).then(({ data }) => {
      alert(`Post of id  deleted`);
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <section key={post?.id}>
          <h4>
            {post?.id}. {post.title ?? "No Post"}
          </h4>
          <p>{post?.content}</p>
        </section>
      ))}
      <hr />
      <h1>Single Post</h1>
      <p>
        {post?.id}) {post?.title}
      </p>
      <p>{post?.content}</p>
      <button onClick={createPost}>Create Post</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};
