

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ["PREESCOLAR", "PRIMARIA", "SECUNDARIA"];
    
    return (
      <div className="filter-bar">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default CategoryFilter