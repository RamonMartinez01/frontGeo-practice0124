import { useDispatch } from "react-redux";
import { getEscuelasThunk } from "../../store/slices/escuelas.slice";

const CategoryFilter = ({ selectedCategory, setSelectedCategory, searchTerm }) => {
  const dispatch = useDispatch();
  const categories = ["PREESCOLAR", "PRIMARIA", "SECUNDARIA"];

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    // Fetch filtered data immediately when the category changes
    dispatch(getEscuelasThunk(newCategory, searchTerm));
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