import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../services";
import { useState } from "react";

const Authors = ({ handleNotify }) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      handleNotify({ message, type: "error" });
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, born: Number(born) } });
    setName("");
    setBorn("");
  };

  if (result.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={onSubmit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
