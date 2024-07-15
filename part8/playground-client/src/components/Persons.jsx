import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FIND_PERSON } from "../queries";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons = [] }) => {
  const [nameToSearch, setNameToSeach] = useState(null);

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        onClose={() => setNameToSeach(null)}
        person={result.data.findPerson}
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p, index) => (
        <div key={index}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSeach(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
