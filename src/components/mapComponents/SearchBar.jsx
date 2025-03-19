import "./Styles/Searchbar_styles.css"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    
     return (
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o dirección..."
        />
        <box-icon name="search-alt-2"></box-icon>  
      </div>
    )
  }
  
  export default SearchBar