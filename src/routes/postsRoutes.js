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
  getAllUserPostsController,
  getAllUserDraftsController,
} = require("../controllers/postControllers");
const tryBothAuth = require("../middleware/tryBothAuth");

//normal user

router.get("/posts", tryBothAuth, getPostsController);

router.get("/posts/:postId", tryBothAuth, getSpecificPostController);

// admin

// for authors to see all their published blogs
router.get(
  "/:userId/posts",
  passportAdmin.authenticate("admin-jwt", { session: false }),
  getAllUserPostsController
);

//to see all their unPublished posts
router.get(
  "/:userId/drafts",
  passportAdmin.authenticate("admin-jwt", { session: false }),
  getAllUserDraftsController
);

router.post(
  "/posts",
  passportAdmin.authenticate("admin-jwt", { session: false }),
  createNewPostController
);

router.put(
  "/posts/:postId",
  passportAdmin.authenticate("admin-jwt", { session: false }),
  updatePostController
);

router.delete(
  "/posts/:postId",
  passportAdmin.authenticate("admin-jwt", { session: false }),
  isAuthor,
  deletePostController
);

module.exports = router;
