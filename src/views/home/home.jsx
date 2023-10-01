import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/cards/cards";
import Paginate from "../../components/paginate/paginate";
import NavBar from "../../components/nav/nav";
import Filter from "../../components/filter/filter";
import OrderBy from "../../components/orderBy/orderBy";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Loader from "../../components/loader/loader";
import Footer from "../footer/footer";
import { getAllProducts, orderByPrice} from "../../redux/actions";

const Home = () => {
  window.scrollTo(0, 0);
  const allProducts1 = useSelector((state) => state.allProducts1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState(false);

  useEffect(() => {
    dispatch(orderByPrice(orderBy));
  }, [orderBy]);

  useEffect(() => {
    dispatch(getAllProducts());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
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
        <Container
          style={{
            width: "100%",
          }}
        >
          <Grid container sx={{ paddingTop: "4px" }}>
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              sx={{
                paddingTop: "4px",
              }}
            >
              {<Filter />}
            </Grid>
            <Grid item xs={12} md={9} lg={9} xl={9}>
              <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
              <Cards currentProduct={currentProduct} />
            </Grid>
          </Grid>
        </Container>
      )}

      {currentProduct.length ? (
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default Home;
