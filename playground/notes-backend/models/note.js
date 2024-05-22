require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((_) => console.log("connected to DB"))
  .catch((err) => console.log("error connecting to DB", err.message));

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 5,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
