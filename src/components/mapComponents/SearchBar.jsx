import "./Styles/SearchBar_styles.css";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
    
const clearSearch = () => {
  setSearchTerm("");
};

     return (
      <form  className="search-bar" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o dirección..."
        />

        { searchTerm && ( //Only show "X" when searchTerm is not empty
          <box-icon name='x-circle' onClick={clearSearch} className="clear-icon" ></box-icon>
        )}

        <box-icon name="search-alt-2" onClick={handleSearch} className="search-icon" ></box-icon>  
      </form >
    );
  };
  
  export default SearchBar