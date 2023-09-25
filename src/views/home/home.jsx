import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/cards/cards";
import Paginate from "../../components/paginate/paginate";
import NavBar from "../../components/nav/nav";
import { getAllProducts } from "../../redux/actions";
import Filter from "../../components/filter/filter";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Loader from "../../components/loader/loader";
import Footer from "../footer/footer";
import { useAuth0 } from "@auth0/auth0-react";
import autenticateAllUsers from "../../helpers/autenticateAllUsers";

const Home = () => {
  const allProducts1 = useSelector((state) => state.allProducts1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  //-------------------------------//
  const { user } = useAuth0();

  useEffect(() => {
    if (user && user.email) {
      const result = autenticateAllUsers(user);
      console.log(result);
    }
  }, [user]);

  //-----------------------------//

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
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Container
            style={{ display: "flex", padding: "20px", width: "400rem" }}
          >
            <Filter />
            <Grid sx={{ width: "100%", display: "flex" }}>
              <Cards currentProduct={currentProduct} />
            </Grid>
          </Container>
        </div>
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
