import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getEscuelasThunk } from "../../store/slices/escuelas.slice";

const SearchBar = ({ searchTerm, setSearchTerm, selectedCategory, currentpage }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getEscuelasThunk(selectedCategory, searchTerm, currentpage));
    }, 500);// Wait 500ms after typing

    return () => clearTimeout(delayDebounceFn); // Clear timeout on each keystroke
  }, [ searchTerm, dispatch, selectedCategory, currentpage])

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