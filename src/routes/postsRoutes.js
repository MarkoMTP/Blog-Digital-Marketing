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
} = require("../controllers/postControllers");

//normal user

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getPostsController
);

router.get(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  getSpecificPostController
);

// admin

// for authors to see all their published blogs
router.get("/posts/:userId");

//to see all their unPublished posts
router.get("/posts/drafts/:userId");

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

module.exports = router;
