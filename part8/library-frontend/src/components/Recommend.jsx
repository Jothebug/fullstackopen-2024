import { useQuery } from "@apollo/client";
import { ALL_BOOKS, USER } from "../services";
import { useMemo, useState } from "react";

const Recommend = () => {
  const userRes = useQuery(USER);
  const [] = useState();

  const user = useMemo(() => {
    if (!userRes?.data?.me) return;

    return userRes.data.me;
  }, [userRes?.data?.me]);

  console.log("user", user);

  //   const bookRes = useQuery(ALL_BOOKS, {
  //     variables: { ...(user.favoriteGenre && { genre: user.favoriteGenre }) },
  //     skip: !selectedGenre,
  //   });

  const bookRes = {};

  const books = useMemo(() => {
    if (!bookRes?.data?.allBooks) return [];
    return bookRes.data.allBooks;
  }, [bookRes?.data?.allBooks]);

  if (userRes?.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <dev>books in your favorite genre</dev>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
