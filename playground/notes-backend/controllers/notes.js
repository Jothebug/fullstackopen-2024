const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (_, response, next) => {
  Note.find({})
    .then((notes) => {
      response.status(200).json(notes);
    })
    .catch((error) => next(error));
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.status(200).json(note);
      } else {
        response.statusMessage = "Current id does not find";
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

notesRouter.post("/", (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note
    .save()
    .then((note) => response.status(201).json(note))
    .catch((error) => next(error));
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((_) => response.status(204).end())
    .catch((err) => next(err));
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((note) => {
      if (note) {
        response.status(200).json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
