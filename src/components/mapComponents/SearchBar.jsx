import "./Styles/SearchBar_styles.css";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();         // Prevent form reload
    handleSearch();             // Explicitly trigger search
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nombre o dirección..."
         aria-label="Buscar escuela"
      />

      {searchTerm.trim() !== "" && ( //Only show "X" when searchTerm is not empty
        <box-icon name='x-circle'
          onClick={clearSearch}
          className="clear-icon"
          type="button" 
          aria-label="Borrar búsqueda"
        >
        </box-icon>
      )}

      <button type="submit" className="search-icon-btn" aria-label="Buscar">
        <box-icon name="search-alt-2" className="search-icon" />
      </button>
    </form >
  );
};

export default SearchBar