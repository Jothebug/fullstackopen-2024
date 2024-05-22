const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (_, response, next) => {
  try {
    const notes = await Note.find({});
    response.status(200).json(notes);
  } catch (error) {
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
  try {
    const { content, important = false } = request.body;
    const res = await new Note({ content, important }).save();
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
