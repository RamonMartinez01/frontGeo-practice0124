
const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {

  const categories = ["PREESCOLAR", "PRIMARIA", "SECUNDARIA"];

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
;
};
    
  return (
    <div className="filter-bar">
      <select value={selectedCategory} onChange={handleCategoryChange}>
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