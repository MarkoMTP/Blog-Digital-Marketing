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

const findUserEmail = async function (email) {
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result;
};

module.exports = {
  addUserToDb,
  findUserEmail,
};
