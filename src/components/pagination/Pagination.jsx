import './styles/Pagination.css'

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
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

  return (
      <div className="pagination">
          {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
              </button>
          )}
          {pageNumbers[0] > 1 && (
              <button onClick={() => handlePageChange(1)}>1</button>
          )}
          {pageNumbers[0] > 2 && <span>...</span>}
          {pageNumbers.map((number) => (
              <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={currentPage === number ? 'active' : ''}
              >
                  {number}
              </button>
          ))}
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span>...</span>}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <button onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
              </button>
          )}
          {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                  Next
              </button>
          )}
      </div>
  );
};

export default Pagination;