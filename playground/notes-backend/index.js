require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/api/notes", (_, response, next) => {
  Note.find({})
    .then((notes) => {
      response.status(200).json(notes);
    })
    .catch((error) => next(error));
});

app.get("/api/notes/:id", (request, response, next) => {
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

app.post("/api/notes", (request, response, next) => {
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

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((_) => response.status(204).end())
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (request, response, next) => {
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

const errorHandler = (error, _, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(unknownEndpoint);
app.use(requestLogger);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
