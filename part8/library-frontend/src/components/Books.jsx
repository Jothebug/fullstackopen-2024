import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GENRES } from "../services";
import { useMemo, useState } from "react";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("All genres");

  const genreRes = useQuery(GENRES);
  const bookRes = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  });

  const allBooks = useMemo(() => {
    if (!bookRes?.data?.allBooks) return [];
    return bookRes.data.allBooks;
  }, [bookRes?.data?.allBooks]);

  const genres = useMemo(() => {
    if (!genreRes?.data?.allGenres) return [];
    const genres = genreRes.data.allGenres;
    return ["All genres", ...genres];
  }, [!genreRes?.data?.allGenres]);

  if (bookRes.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>books</h2>
      <div>in genre {selectedGenre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre, index) => {
        if (genre)
          return (
            <button
              key={`${genre}${index}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          );
      })}
    </div>
  );
};

export default Books;
