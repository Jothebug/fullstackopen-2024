import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClear = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    onClear,
  };
};

const useResource = ({ type }) => {
  const baseUrl = `http://localhost:3005/${type}`;
  const [resources, setResources] = useState([]);

  const getAll = () => {
    axios
      .get(baseUrl)
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => setResources([]));
  };

  const create = (data = {}) => {
    axios
      .post(baseUrl, data)
      .then((res) => setResources((prev) => [...prev, res.data]))
      .catch((err) => setResources((prev) => prev));
  };

  useEffect(() => {
    getAll();
  }, []);

  const service = { create };

  return [resources, service];
};

const App = () => {
  const content = useField("content");
  const name = useField("name");
  const number = useField("number");

  const [notes, noteService] = useResource({ type: "notes" });
  const [persons, personService] = useResource({ type: "persons" });

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.onClear();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.onClear();
    number.onClear();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
