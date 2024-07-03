import axios from "axios";
const baseUrl = "/api/login";

const login = async (user) => {
  return await axios.post(baseUrl, user);
};

export default { login };
