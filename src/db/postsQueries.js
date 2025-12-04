const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAllPosts = async function () {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true, // Include the author (User) data
    },
  });
  return posts;
};

const findPost = async function (id) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      comments: {
        include: {
          author: {
            select: {
              userName: true, // Ensure you select the needed fields
            },
          },
        },
      },
    },
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
    include: {
      author: {
        select: {
          id: true,
          userName: true, // Ensure you select the field you need
        },
      },
    },
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

const findComment = async function (postId, commentId) {
  const comment = await prisma.comment.findFirst({
    where: { postId: postId, id: commentId },
  });
  return comment;
};

const getaAllUserPosts = async (userId) => {
  const posts = await prisma.post.findMany({
    where: { authorId: userId, isPublished: true },
    include: {
      author: true, // Include the author (User) data
    },
  });
  return posts;
};

const getaAllUserDrafts = async (userId) => {
  const posts = await prisma.post.findMany({
    where: { authorId: userId, isPublished: false },
    include: {
      author: true, // Include the author (User) data
    },
  });
  return posts;
};

const deleteComment = async (postId, commentId) => {
  const result = await prisma.comment.delete({
    where: { postId: postId, id: commentId },
  });
  return result;
};

const deleteAllComments = async (postId) => {
  const result = await prisma.comment.deleteMany({
    where: { postId: postId },
  });
  return result;
};

const getaAllPublishedPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: {
      author: true, // Include the author (User) data
      comments: true,
    },
  });
  return posts;
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
  getaAllUserPosts,
  getaAllUserDrafts,
  deleteAllComments,
  getaAllPublishedPosts,
};
