const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

usersRouter.get("/", async (_, response, next) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      response.status(200).json(user);
    } else {
      response.statusMessage = "Current id does not find";
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  const { name, username, password } = request.body;
  const saltRound = 10;

  try {
    const passwordHash = await bcrypt.hash(password, saltRound);
    const user = await new User({ name, username, passwordHash }).save();
    console.log("user", user);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
