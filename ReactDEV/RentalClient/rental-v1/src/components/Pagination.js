import React from 'react';

const Pagination = ({ currentPage, handlePageChange }) => (
  <div className="pagination">
    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
      Précédent
    </button>
    <span>Page {currentPage}</span>
    <button onClick={() => handlePageChange(currentPage + 1)}>
      Suivant
    </button>
  </div>
);

export default Pagination;
