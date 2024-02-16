const Persons = ({ persons, filteredPersons, onDelete }) => {
  const data = filteredPersons.length > 0 ? filteredPersons : persons;

  return (
    <div>
      <h3>Numbers</h3>
      {data.map((item, index) => (
        <div key={index}>
          <p>
            {item.name}: {item.number}{" "}
            <button onClick={() => onDelete?.(item)}>delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
