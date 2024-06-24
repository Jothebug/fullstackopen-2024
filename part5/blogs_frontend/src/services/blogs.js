import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const createBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("@token")}`,
    },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const updateBlog = async ({ id, data }) => {
  const res = await axios.put(`${baseUrl}/${id}`, data);
  return res.data;
};

const deleteBlog = async ({ id }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("@token")}`,
    },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createBlog, updateBlog, deleteBlog };
