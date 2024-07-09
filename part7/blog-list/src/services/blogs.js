import axios from "axios";
const baseUrl = "/api/blogs";

const token = window.localStorage.getItem("@TOKEN");

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.post(baseUrl, newBlog, config);
  return data;
};

const updateBlog = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/${id}`, data);
  return res.data;
};

const deleteBlog = async ({ id }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createBlog, updateBlog, deleteBlog };
