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

const updatePost = async function (
  postId,
  title,
  content,
  authorId,
  isPublished
) {
  await prisma.post.update({
    where: { id: postId },
    data: {
      title: title,
      content: content,
      isPublished: isPublished,
      authorId: authorId,
    },
  });
};

const deletePost = async function (postId) {
  await prisma.post.delete({
    where: { id: postId },
  });
};

const getAllComments = async (postId) => {
  const result = await prisma.comment.findMany({
    where: { postId: postId },
  });
  return result;
};

const createComment = async (content, authorId, postId) => {
  await prisma.comment.create({
    data: {
      content: content,
      authorId: authorId,
      postId: postId,
    },
  });
};

const deleteComment = async (postId, commentId) => {
  const result = await prisma.comment.delete({
    where: { postId: postId, id: commentId },
  });
  return result;
};

const findComment = async function (postId, commentId) {
  const comment = await prisma.comment.findFirst({
    where: { postId: postId, id: commentId },
  });
  return comment;
};

module.exports = {
  findAllPosts,
  createPost,
  findPost,
  updatePost,
  deletePost,
  getAllComments,
  createComment,
  deleteComment,
  findComment,
};
