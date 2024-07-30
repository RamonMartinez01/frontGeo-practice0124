
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    
    return (
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or address..."
        />
      </div>
    )
  }
  
  export default SearchBar