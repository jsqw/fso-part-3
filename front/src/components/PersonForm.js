const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <label>Name:</label>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label>Number:</label>
          <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PersonForm;
