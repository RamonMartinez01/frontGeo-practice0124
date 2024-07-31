import './styles/Pagination.css'

const Pagination = ({ currentPage, totalPages, handlePageChange, setSelectedMarker }) => {
  const getPageNumbers = () => {
      const pageNumbers = [];
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
      }

      return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChangeAndResetMarker = (pageNumber) => {
    handlePageChange(pageNumber);
    setSelectedMarker(null);
};

  return (
      <div className="pagination">
          {currentPage > 1 && (
              <button onClick={() => handlePageChangeAndResetMarker(currentPage - 1)}>
                  anterior
              </button>
          )}
          {pageNumbers[0] > 1 && (
              <button onClick={() => handlePageChangeAndResetMarker(1)}>1</button>
          )}
          {pageNumbers[0] > 2 && <span>...</span>}
          {pageNumbers.map((number) => (
              <button
                  key={number}
                  onClick={() => handlePageChangeAndResetMarker(number)}
                  className={currentPage === number ? 'active' : ''}
              >
                  {number}
              </button>
          ))}
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span>...</span>}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <button onClick={() => handlePageChangeAndResetMarker(totalPages)}>
                  {totalPages}
              </button>
          )}
          {currentPage < totalPages && (
              <button onClick={() => handlePageChangeAndResetMarker(currentPage + 1)}>
                  siguiente
              </button>
          )}
      </div>
  );
};

export default Pagination;