require("dotenv").config();
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(request.body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }
    const { username, _id, name } = user;
    const token = jwt.sign({ username, id: _id }, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
    response.status(200).json({ token, username, name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
