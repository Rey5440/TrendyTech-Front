import Button from "@mui/material/Button";
import './paginate.css';
const Paginate = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', marginTop: '10px'}}>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="contained"
      >
        &larr; Anterior
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          // variant="text"
          sx={{margin: '2px', marginLeft: '5px', marginRight: '5px'}}
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          variant={currentPage !== index + 1 ? "outlined" : "disabled"}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="contained"
      >
        Siguiente &rarr;
      </Button>
    </div>
  );
};

export default Paginate;
