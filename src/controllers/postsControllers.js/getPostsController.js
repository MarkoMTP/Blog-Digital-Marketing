const {
  findAllPosts,
  findPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../db/postsQueries");

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

const updatePostController = async (req, res) => {
  const { title, content, isPublished } = req.body;
  const { id: authorId } = req.user;
  const { postId } = req.params;

  await updatePost(postId, title, content, authorId, isPublished);

  const post = await findPost(postId);

  res.json(post);
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await findPost(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    await deletePost(postId);
    res.send("Post Deleted");
  } catch (error) {
    res.status(500).send("An error occurred while deleting the post");
  }
};

module.exports = {
  getPostsController,
  getSpecificPostController,
  createNewPostController,
  updatePostController,
  deletePostController,
};
