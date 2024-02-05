import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";
const apiKey = import.meta.env.VITE_SOME_KEY;

const getCountries = async () => {
  return await axios.get(`${baseURL}/all`);
};

const getWeather = async ({ lat, lon }) => {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
};

export { getCountries, getWeather };
