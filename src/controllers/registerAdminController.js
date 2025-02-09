const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { findUserEmail, addUserToDb, addAdminToDb } = require("../db/queries"); // Adjust the path to your queries file

const registerAdminController = async (req, res) => {
  console.log("Received body:", req.body); // D
  const { userName, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check if email is already registered
  try {
    const result = await findUserEmail(email);
    if (result) {
      return res.status(400).send("Email already in use");
    } else {
      //hash the password and add to db
      const hashedPassword = await bcrypt.hash(password, 10);
      await addAdminToDb(userName, email, hashedPassword);

      return res.send("Success admin added");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registrating user");
  }
};

module.exports = registerAdminController;
