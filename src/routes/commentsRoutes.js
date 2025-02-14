const express = require("express");
const router = express.Router();
const passport = require("../passport/passport");
const isAuthorComment = require("../middleware/isAuthorComment");

const {
  getCommentsController,
  createCommentController,
  deleteCommentController,
} = require("../controllers/commentControllers");

router.get(
  "/posts/:postId/comments",
  passport.authenticate("jwt", { session: false }),

  getCommentsController
);

router.post(
  "/posts/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  createCommentController
);

router.delete(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  isAuthorComment,
  deleteCommentController
);

module.exports = router;
