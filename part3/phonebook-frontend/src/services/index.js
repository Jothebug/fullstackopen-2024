import axios from "axios";

const baseURL = "https://phonebook-backend-part3-fso2024.fly.dev/api/persons";

const getPersons = async () => {
  return await axios.get(baseURL);
};

const createPerson = async (newPerson) => {
  return await axios.post(baseURL, newPerson);
};

const removePerson = async (id) => {
  return await axios.delete(`${baseURL}/${id}`);
};

const updatePerson = async (id, data) => {
  return await axios.put(`${baseURL}/${id}`, data);
};

export { getPersons, createPerson, removePerson, updatePerson };
