import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  // const onClear = () => {
  //   setValue("");
  // };
  return { type, value, onChange };
};

export { useField };
