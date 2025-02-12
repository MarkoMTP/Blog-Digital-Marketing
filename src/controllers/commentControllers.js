const {
  getAllComments,
  findPost,
  createComment,
  findComment,
  deleteComment,
} = require("../db/postsQueries");

const getCommentsController = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await findPost(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const comments = await getAllComments(postId);
    if (!comments || comments.length === 0) {
      return res.status(404).send("No comments found for this post");
    }

    res.json(comments);
  } catch (error) {
    console.error("Error getting comments:", error); // Log the exact error for debugging
    res
      .status(500)
      .send(`An error occurred while getting the comments: ${error.message}`);
  }
};

const createCommentController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const { id: authorId } = req.user;

    const post = await findPost(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    await createComment(content, authorId, postId);
    const comments = await getAllComments(postId);

    res.json(comments);
  } catch (error) {
    console.error("Error creating comment:", error); // Log the exact error for debugging
    res
      .status(500)
      .send(`An error occurred while creating the comment: ${error.message}`);
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const { commentId, postId } = req.params;
    const post = await findPost(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const comment = await findComment(postId, commentId);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    await deleteComment(postId, commentId);
    res.send("Comment deleted");
  } catch (error) {
    console.error("Error deleting comment:", error); // Log the exact error for debugging
    res
      .status(500)
      .send(`An error occurred while deleting the comment: ${error.message}`);
  }
};

module.exports = {
  getCommentsController,
  createCommentController,
  deleteCommentController,
};
