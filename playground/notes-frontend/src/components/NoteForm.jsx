import React, { useState } from "react";

export default function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState();

  const addNote = (event) => {
    event.preventDefault();
    createNote?.({
      content: newNote,
      important: true,
    });
    setNewNote("");
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={addNote} />
        <button type="submit">save</button>
      </form>
    </div>
  );
}
