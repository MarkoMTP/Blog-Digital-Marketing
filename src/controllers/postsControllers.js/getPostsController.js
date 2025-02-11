const { findAllPosts, findPost, createPost } = require("../../db/postsQueries");

const getPostsController = async (req, res) => {
  const posts = await findAllPosts();

  res.json(posts);
};

const getSpecificPostController = async (req, res) => {
  const id = req.params.postId; // postId will be the value from the URL
  const post = await findPost(id); // Find the post by its ID

  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Post not found");
  }
};

const createNewPostController = async (req, res) => {
  const { title, content, isPublished } = req.body;
  const { id: authorId } = req.user;

  const post = await createPost(title, content, authorId, isPublished);

  res.send(`the  post is created  ${title}`);
};

module.exports = {
  getPostsController,
  getSpecificPostController,
  createNewPostController,
};
