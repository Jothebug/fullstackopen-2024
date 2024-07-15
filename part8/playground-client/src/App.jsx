import { useQuery } from "@apollo/client";
import { Notify, PersonForm, Persons, PhoneForm } from "./components";
import { ALL_PERSONS } from "./queries";
import { useState } from "react";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(
    ALL_PERSONS
    //  { pollInterval: 2000 }
  );

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (result.loading) return <div>loading...</div>;

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
