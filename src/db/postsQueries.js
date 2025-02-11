const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAllPosts = async function () {
  const posts = await prisma.post.findMany();
  return posts;
};

const findPost = async function (id) {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return post;
};

const createPost = async function (title, content, authorId, isPublished) {
  await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
      isPublished: isPublished,
    },
  });
};

module.exports = {
  findAllPosts,
  createPost,
  findPost,
};
