import { useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";

import {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  RECOMMENDED_LIST,
} from "../services";
import LoginForm from "./LoginForm";

const NewBook = ({ handleNotify }) => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
      { query: RECOMMENDED_LIST },
    ],
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      handleNotify({ message, type: "error" });
    },
  });

  const submit = (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published: Number(published), genres },
    });
    handleNotify({ message: "Successsful", type: "success" });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  const logout = async () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
  };

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    setToken(token);
  }, []);

  if (!token) return <LoginForm setToken={setToken} />;

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
