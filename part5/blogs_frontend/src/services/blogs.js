import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const instance = axios.create({
  baseURL: "http://localhost:3003/api/",
  headers: { Authorization: token },
});

const getAll = async () => {
  return await instance({ url: "blogs", method: "GET" });
};

const createBlog = async (newBlog) => {
  const res = await instance({ url: "blogs", method: "POST", data: newBlog });
  return res.data;
};

const updateBlog = async ({ id, data }) => {
  const res = await instance({ url: `blogs/${id}`, method: "PUT", data });
  return res.data;
};

const deleteBlog = async ({ id }) => {
  return await instance({ url: `blogs/${id}`, method: "DELETE" });
};

export default { getAll, createBlog, setToken, updateBlog, deleteBlog };
