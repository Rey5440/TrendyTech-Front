
const Paginate = ({handlePageChange, currentPage, totalPages}) => {
  return (
    <div>
        <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}>
          &larr; Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente &rarr;
        </button>
      </div>
  )
}

export default Paginate