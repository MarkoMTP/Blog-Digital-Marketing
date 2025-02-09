const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const routes = require("./src/routes/loginRoutes");
const prisma = new PrismaClient();
const app = express();

app.use(express.static("public"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(routes);

const passport = require("passport");

app.use(passport.initialize());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
