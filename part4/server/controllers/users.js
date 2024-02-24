const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

usersRouter.get("/", async (_, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "The length of password is bigger than 3" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      name,
      username,
      passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
