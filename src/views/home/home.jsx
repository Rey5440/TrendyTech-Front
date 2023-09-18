import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/cards/cards";
import Paginate from "../../components/paginate/paginate";
import NavBar from "../../components/nav/nav";
import { getAllProducts } from "../../redux/actions";
import Filter from "../../components/filter/filter";
import Grid from "@mui/material/Grid";
import Loader from "../../components/loader/loader";

const Home = () => {
  const allProducts1 = useSelector((state) => state.allProducts1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProducts());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allProducts1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allProducts1.length / productsPerPage);

  return (
    <div>
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Filter />
            <Grid sx={{ width: "100%" }}>
              <Cards currentProduct={currentProduct} />
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
