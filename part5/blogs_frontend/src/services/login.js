import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3003/api",
});

const login = async (user) => {
  const res = await instance({ url: "login", method: "POST", data: user });
  return res.data;
};

export default { login };
