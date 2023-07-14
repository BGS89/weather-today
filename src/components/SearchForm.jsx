function SearchForm({ handleSearch, search, setSearch }) {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        id="search"
        autoComplete="off"
        placeholder="search by city..."
        required
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button>Search</button>
    </form>
  );
}

export default SearchForm;
