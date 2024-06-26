import { useDispatch } from "react-redux";
import { filter } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(filter({ search: event.target.value }));
  };

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
