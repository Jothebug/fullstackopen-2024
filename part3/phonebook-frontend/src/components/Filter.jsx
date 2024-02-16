const Filter = ({ onFilter }) => {
  return (
    <label>
      filter shown with: <input onChange={onFilter} />
    </label>
  );
};

export default Filter;
