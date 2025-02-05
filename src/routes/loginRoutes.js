const express = require("express");
const router = express.Router();

//reg validator
const { registerValidator } = require("../middleware/registerValidator");
const registerController = require("../controllers/registerController");

router.get("/", (req, res) => {
  res.send("HomePage");
});

router.post("/register", registerValidator, registerController);

module.exports = router;
