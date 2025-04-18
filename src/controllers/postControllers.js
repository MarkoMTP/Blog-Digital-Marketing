const {
  findAllPosts,
  findPost,
  createPost,
  updatePost,
  deletePost,
  getaAllUserPosts,
  getaAllUserDrafts,
  deleteAllComments,
} = require("../db/postsQueries");

const getPostsController = async (req, res) => {
  try {
    const posts = await findAllPosts();

    if (!posts) {
      return res.status(404).send("Post not found");
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(404).send("No posts found");
  }
};

const getSpecificPostController = async (req, res) => {
  try {
    const id = req.params.postId; // postId will be the value from the URL
    const post = await findPost(id); // Find the post by its ID

    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(404).send("Error found for this post");
  }
};

const createNewPostController = async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    const { id: authorId } = req.user;

    const post = await createPost(title, content, authorId, isPublished);

    res.send(`the  post is created  ${post}`);
  } catch (error) {
    console.error(error);
    return res.status(404).send("Error found for this post");
  }
};

const updatePostController = async (req, res) => {
  const { title, content, isPublished } = req.body;
  const { id: authorId } = req.user;
  const { postId } = req.params;

  try {
    const post = await findPost(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Update post
    await updatePost(postId, title, content, authorId, isPublished);

    // Fetch the updated post
    const updatedPost = await findPost(postId);

    res.json(updatedPost); // Return the updated post
  } catch (error) {
    console.error("Error updating post:", error); // Log the error for debugging
    res
      .status(500)
      .send(`An error occurred while updating the post: ${error.message}`);
  }
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await findPost(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.comments && post.comments.length > 0) {
      await deleteAllComments(postId);
    }
    await deletePost(postId);
    res.send("Post Deleted");
  } catch (error) {
    res.status(500).send("An error occurred while deleting the post");
  }
};

const getAllUserPostsController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).send("User not found");
    }

    const posts = await getaAllUserPosts(user.id);

    if (!posts) {
      return res.status(404).send("Posts not found");
    }

    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .send(`An error occurred while getting the posts: ${err.message}`);
  }
};

const getAllUserDraftsController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).send("User not found");
    }

    const drafts = await getaAllUserDrafts(user.id);

    res.json(drafts);
  } catch (err) {
    res
      .status(500)
      .send(`An error occurred while fetching the drafts: ${err.message}`);
  }
};

module.exports = {
  getPostsController,
  getSpecificPostController,
  createNewPostController,
  updatePostController,
  deletePostController,
  getAllUserPostsController,
  getAllUserDraftsController,
};
