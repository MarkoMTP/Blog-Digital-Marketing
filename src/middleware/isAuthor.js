const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const isAuthor = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get logged-in user's ID
    const { postId } = req.params; // Get post ID from URL

    // Fetch the post from the database
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true }, // Only fetch authorId to optimize query
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the author of this post" });
    }

    next(); // User is the author, proceed to the next middleware/controller
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = isAuthor;
