import axios from "axios";
const baseUrl = "/api/blogs";

const token = window.localStorage.getItem("@TOKEN");

const getAll = async () => {
  const { data } = axios.get(baseUrl);
  return data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.post(baseUrl, newBlog, config);
  return data;
};

export default { getAll, createBlog };
