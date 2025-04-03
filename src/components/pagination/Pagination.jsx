import './styles/Pagination.css'

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {

  return (
      <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        {"<"} Anterior
      </button>

      <span>Página <strong>{currentPage}</strong> de {totalPages}</span>

      <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        Siguiente {">"}
      </button>
      </div>
  );
};

export default Pagination;