const { findUserEmail } = require("../db/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logincontroller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserEmail(email);
    if (!user) {
      return res.status(200).send("User does not exist");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(200).send("Password is not correct");
    }

    //create a JWT token
    const token = jwt.sign(
      { id: user.id, isAuthor: user.isAuthor },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.send({ message: "Logged in", token });
  } catch (err) {
    return console.error(err);
  }
};

module.exports = logincontroller;
