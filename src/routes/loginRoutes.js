const express = require("express");
const router = express.Router();
const passport = require("../passport/passport");
const passportAdmin = require("../passport/passportAdmin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//reg validator
const { registerValidator } = require("../middleware/registerValidator");

//controllers
const registerController = require("../controllers/registerController");
const registerAdminController = require("../controllers/registerAdminController");

//queries
const { findUserEmail } = require("../db/queries");
const logincontroller = require("../controllers/loginController");

//routes
router.get("/", (req, res) => {
  res.send("HomePage");
});

// normal page
// router.get("/register")

router.post("/register", registerValidator, registerController);

// login get

router.post("/login", logincontroller);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }), // Use passport middleware to check the token
  (req, res) => {
    res.json({ message: "You are authenticated", user: req.user });
  }
);

// for admin page
router.post("/registerAdmin", registerValidator, registerAdminController);

router.get(
  "/adminProtected",
  passportAdmin.authenticate("jwt", { session: false }), // Use passport middleware to check the token
  (req, res) => {
    res.json({ message: "You are authenticated admin", user: req.user });
  }
);

module.exports = router;
