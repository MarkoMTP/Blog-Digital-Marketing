const express = require("express");
const router = express.Router();
const passport = require("../passport/passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//reg validator
const { registerValidator } = require("../middleware/registerValidator");
const registerController = require("../controllers/registerController");
const { findUserEmail } = require("../db/queries");

router.get("/", (req, res) => {
  res.send("HomePage");
});

// router.get("/register")

router.post("/register", registerValidator, registerController);

// login get

router.post("/login", async (req, res) => {
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
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }), // Use passport middleware to check the token
  (req, res) => {
    res.json({ message: "You are authenticated", user: req.user });
  }
);

module.exports = router;
