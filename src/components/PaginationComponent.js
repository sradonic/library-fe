import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange, getPaginationNumbers }) => {
    const paginationNumbers = getPaginationNumbers();

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)} className="btn btn-secondary">Prev</button>
            )}
            {paginationNumbers.map(page => (
                <button key={page}
                        onClick={() => onPageChange(page)}
                        className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}>
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)} className="btn btn-secondary">Next</button>
            )}
        </div>
    );
};

export default PaginationComponent;
