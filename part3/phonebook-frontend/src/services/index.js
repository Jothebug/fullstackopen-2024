import axios from "axios";

const baseURL = "https://fullstackopen-2024-part3.fly.dev/api";

const getPersons = async () => {
  return await axios.get(`${baseURL}/persons`);
};

const createPerson = async (newPerson) => {
  return await axios.post(`${baseURL}/persons`, newPerson);
};

const removePerson = async (id) => {
  return await axios.delete(`${baseURL}/persons/${id}`);
};

const updatePerson = async (id, data) => {
  return await axios.put(`${baseURL}/persons/${id}`, data);
};

export { getPersons, createPerson, removePerson, updatePerson };
