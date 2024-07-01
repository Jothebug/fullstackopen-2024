import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onReset = () => setValue("");

  const input = { name, value, onChange };
  return { input, onReset };
};
