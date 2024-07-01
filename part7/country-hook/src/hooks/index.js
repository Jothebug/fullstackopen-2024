import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name = "") => {
  const [country, setCountry] = useState(null);

  if (!name) return null;

  useEffect(() => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}?fullText=true`
      )
      .then((response = {}) => {
        setCountry({ country: response.data, found: true });
      })
      .catch((error) => {
        setCountry({ found: false });
      });
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};
