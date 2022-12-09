const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Trial response from server");
});

//data
const posts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    content:
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    content:
      "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    content:
      "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
  },
];

//get request for all the posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//get request for a particular post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === +req.params.id);
  post ? res.send(post) : res.status(404).json("Error 404 Page not Found");
});

//creating a new post
app.post("/posts", (req, res) => {
  debugger;
  const post = {
    userId: req.body.userId,
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(post);
  res.send(post);
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === +req.params.id);
  post
    ? (post.title = "Updated Post" + req.body.title)
    : res.status(404).send("Error 404 Page not found");

  res.send(post);
});

app.delete("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === +req.params.id);

  !post && res.status(404).send("Error 404 Page not found");

  posts.splice(posts.indexOf(post));
  res.send(posts);
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log("Server started at port " + port));
