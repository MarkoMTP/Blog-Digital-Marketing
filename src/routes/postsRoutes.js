const express = require("express");
const router = express.Router();
const passport = require("../passport/passport");
const passportAdmin = require("../passport/passportAdmin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//middleware
const isAuthor = require("../middleware/isAuthor");

//controllers
const {
  getPostsController,
  getSpecificPostController,
  createNewPostController,
  deletePostController,
  updatePostController,
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

router.put(
  "/posts/:postId",
  passportAdmin.authenticate("jwt", { session: false }),
  isAuthor,
  updatePostController
);
11;

router.delete(
  "/posts/:postId",
  passportAdmin.authenticate("jwt", { session: false }),
  isAuthor,
  deletePostController
);

//for drafts/unPublished posts

module.exports = router;
