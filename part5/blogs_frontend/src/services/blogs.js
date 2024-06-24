import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  return await axios.get(baseUrl);
};

const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const updateBlog = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/${id}`, data);
  return res.data;
};

const deleteBlog = async ({ id }) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
