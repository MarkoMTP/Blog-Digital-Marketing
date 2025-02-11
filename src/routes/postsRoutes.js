const express = require("express");
const router = express.Router();
const passport = require("../passport/passport");
const passportAdmin = require("../passport/passportAdmin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//controllers
const {
  getPostsController,
  getSpecificPostController,
  createNewPostController,
  draftPostController,
} = require("../controllers/postsControllers.js/getPostsController");

//normal user

router.get("/posts", getPostsController);

router.get("/posts/:postId", getSpecificPostController);

// admin

router.post(
  "/posts",
  passportAdmin.authenticate("jwt", { session: false }),
  createNewPostController
);

router.put("/posts/:postId");

router.delete("/posts/:postId");

//for drafts/unPublished posts

module.exports = router;
