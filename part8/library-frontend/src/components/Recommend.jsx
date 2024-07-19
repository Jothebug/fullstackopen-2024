import { useQuery } from "@apollo/client";
import { RECOMMENDED_LIST, USER } from "../services";
import { useMemo } from "react";

const Recommend = () => {
  const userRes = useQuery(USER);
  const recommendedRes = useQuery(RECOMMENDED_LIST);

  const user = useMemo(() => {
    if (!userRes?.data?.me) return null;
    return userRes?.data?.me;
  }, [userRes?.data?.me]);

  const recommendedBooks = useMemo(() => {
    if (!recommendedRes?.data?.recommendedList) return [];
    return recommendedRes.data.recommendedList;
  }, [recommendedRes?.data?.recommendedList]);

  if (userRes?.loading || recommendedRes?.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      {user ? (
        <div>
          {user?.favoriteGenre ? (
            <div>books in your favorite genre {user.favoriteGenre}</div>
          ) : (
            <div>user has no favorite genre</div>
          )}
          {recommendedBooks.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                </tr>
                {recommendedBooks.map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>No authenticated</div>
      )}
    </div>
  );
};

export default Recommend;
