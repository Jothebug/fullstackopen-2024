const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={onSubmit}>
        <label>
          name: <input value={newName} onChange={onChangeName} />
        </label>
        <div>
          number: <input value={newNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
