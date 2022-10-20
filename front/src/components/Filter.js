const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <form>
      <div>
        {"Search: "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  </div>
);

export default Filter;
