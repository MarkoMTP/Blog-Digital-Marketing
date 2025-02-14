const prisma = require("../prismaClient"); // Adjust path as needed

const isAuthorComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { id: userId } = req.user;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    if (comment.authorId !== userId) {
      return res.status(403).send("You are not the author of this comment");
    }

    next();
  } catch (error) {
    console.error("Error checking comment author:", error);
    res.status(500).send("An error occurred while verifying comment ownership");
  }
};

module.exports = isAuthorComment;
