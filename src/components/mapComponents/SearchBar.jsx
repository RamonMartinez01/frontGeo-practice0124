
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    
     return (
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o dirección..."
        />
      </div>
    )
  }
  
  export default SearchBar