import "./Styles/Searchbar_styles.css"

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
    

     return (
      <form  className="search-bar" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o dirección..."
        />
        <box-icon name="search-alt-2" onClick={handleSearch} className="search-icon" ></box-icon>  
      </form >
    )
  }
  
  export default SearchBar