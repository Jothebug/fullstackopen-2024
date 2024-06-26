import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (content) => {
  const newObj = { content, votes: 0 };
  const res = await axios.post(baseUrl, newObj);
  return res.data;
};

export default { getAll, create };
