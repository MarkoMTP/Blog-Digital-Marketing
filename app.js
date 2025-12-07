const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const loginRoutes = require("./src/routes/loginRoutes");
const postRoutes = require("./src/routes/postsRoutes");
const commentRoutes = require("./src/routes/commentsRoutes");

const prisma = new PrismaClient();
const app = express();

const passport = require("passport");

app.use(passport.initialize());

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(loginRoutes);
app.use(postRoutes);
app.use(commentRoutes);

// IMPORTANT: Use Railway port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
