require("dotenv").config();
const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Note = require("../models/note");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (_, response, next) => {
  try {
    const notes = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.status(200).json(notes);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.status(200).json(note);
    } else {
      response.statusMessage = "Current id does not find";
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const { content, important = false } = request.body;
  try {
    const user = await User.findById(decodedToken.id);
    // note
    const res = await new Note({ content, important, user: user._id }).save();
    // update for user
    user.notes = user.notes.concat(res._id);
    await user.save();
    response.status(201).json(res);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  const { content, important } = request.body;
  try {
    const note = await Note.findByIdAndUpdate(
      request.params.id,
      {
        content,
        important,
      },
      { new: true, runValidators: true, context: "query" }
    );
    if (note) {
      response.status(200).json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
