const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addUserToDb = async function (userName, email, password) {
  await prisma.user.create({
    data: {
      userName,
      email,
      password,
    },
  });
};

const addAdminToDb = async function (
  userName,
  email,
  password,
  isAuthor = true
) {
  await prisma.user.create({
    data: {
      userName,
      email,
      password,
      isAuthor,
    },
  });
};

const findUserEmail = async function (email) {
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result;
};

const findUserName = async function (userName) {
  const result = await prisma.user.findUnique({
    where: { userName },
  });
  return result;
};

module.exports = {
  addUserToDb,
  findUserEmail,
  findUserName,
  addAdminToDb,
};
