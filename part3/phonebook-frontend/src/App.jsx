import { useState, useEffect } from "react";
import { Filter, Notification, PersonForm, Persons } from "./components";
import {
  createPerson,
  getPersons,
  removePerson,
  updatePerson,
} from "./services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [person, setPerson] = useState({ newName: "", newNumber: "" });
  const [notification, setNotification] = useState({
    type: "success",
    message: null,
  });

  const handleNotification = (data = {}) => {
    setNotification(data);

    setTimeout(() => {
      setNotification({ type: "success", message: null });
    }, 5000);
  };

  const onCreateNewPerson = async () => {
    try {
      const res = await createPerson({
        name: person.newName,
        number: person.newNumber,
      });
      setPersons(persons.concat(res.data));
      setPerson({ newName: "", newNumber: "" });
    } catch (error) {
      handleNotification({ type: "error", message: error.response.data.error });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const index = persons.findIndex(({ name }) => name === person.newName);

    if (index > -1) {
      const existedPerson = persons[index];
      const askingResult = window.confirm(
        `${existedPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (askingResult) {
        try {
          const data = { name: existedPerson.name, number: person.newNumber };
          const res = await updatePerson(existedPerson.id, data);
          const updatedValue = [...persons];
          updatedValue[index] = res.data;
          setPersons(updatedValue);
          handleNotification({
            type: "success",
            message: `Successfully updated the phone number of ${existedPerson.name}`,
          });
          setPerson({ newName: "", newNumber: "" });
        } catch (error) {
          handleNotification({ type: "error", message: error.message });
        }
      }
      return;
    }
    await onCreateNewPerson();
  };

  const onDelete = async (person) => {
    const askingResult = window.confirm(`Delete ${person.name}?`);
    if (askingResult) {
      try {
        await removePerson(person.id);
        setPersons(persons.filter((p) => p.id !== person.id));
        handleNotification({
          type: "success",
          message: "Successfully deleted",
        });
      } catch (error) {
        handleNotification({ type: "error", message: error.message });
      }
    }
  };

  const onFilter = (e) => {
    const filterText = e.target.value;
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText)
    );
    setFilteredPersons(filtered);
  };

  const handleChangeName = (e) => {
    setPerson((prev) => ({ ...prev, newName: e.target.value }));
  };

  const handleChangeNumber = (e) => {
    setPerson((prev) => ({ ...prev, newNumber: e.target.value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const { data = [] } = await getPersons();
        setPersons(data);
      } catch (error) {
        handleNotification({ type: "error", message: error.message });
      }
    })();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notification.type} message={notification.message} />
      <Filter onFilter={onFilter} />
      <PersonForm
        onSubmit={onSubmit}
        newName={person.newName}
        newNumber={person.newNumber}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />
      <Persons
        persons={persons}
        onDelete={onDelete}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
