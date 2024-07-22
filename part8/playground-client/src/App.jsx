import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

import {
  LoginForm,
  Notify,
  PersonForm,
  Persons,
  PhoneForm,
} from "./components";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return { allPersons: uniqByName(allPersons.concat(addedPerson)) };
  });
};

const App = () => {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      console.log({ data });
      // const addedPerson = data.data.personAdded;
      // updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (result.loading) return <div>loading...</div>;

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <LoginForm setToken={setToken} setError={notify} />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result?.data?.allPersons || []} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
