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

router.post("/register/user", registerValidator, registerController);

router.post("/login", logincontroller);

// for admin page
router.post("/register/admin", registerValidator, registerAdminController);

module.exports = router;
