import { useDispatch } from "react-redux";
import { getEscuelasThunk } from "../../store/slices/escuelas.slice";
import './styles/Pagination.css'

const Pagination = ({ currentPage, totalPages, handlePageChange, setSelectedMarker, searchTerm  }) => {
    const dispatch = useDispatch();

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          handlePageChange(newPage);
          
          // Fetch the new page of results
          dispatch(getEscuelasThunk(selectedCategory, searchTerm, newPage));
        }
      };

  return (
      <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        {"<"} Anterior
      </button>

      <span>Página {currentPage} de {totalPages}</span>

      <button disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)}>
        Siguiente {">"}
      </button>
      </div>
  );
};

export default Pagination;