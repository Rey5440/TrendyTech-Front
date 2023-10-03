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
// import { getAllProducts, orderByPrice } from "../../redux/actions";
import autenticateAllUsers from "../../helpers/autenticateAllUsers";

import { getAllProducts, orderByPrice } from "../../redux/actions";
import useAuth from "../../context-client/hooks/useAuth"

import { getuserData, banUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";


const Home = () => {
  window.scrollTo(0, 0);
  const allProducts1 = useSelector((state) => state.allProducts1);
  const allProductsSearch = useSelector((state) => state.allProductsSearch);
  const searchOn = useSelector((state) => state.searchOn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [orderBy, setOrderBy] = useState(false);
  const auth = useAuth()

  console.log(auth.auth.name)

  console.log(auth.auth.email)

  console.log(useAuth())

  // const [orderBy, setOrderBy] = useState("");


  //-------------autenticate user with cookies------------------//
  const isBanned = useSelector((state) => state.setOpen);
  const [ignacioMagic, setIgnacioMagic] = useState({});
  const { user } = useAuth0();
  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const result = await autenticateAllUsers(user);
          setIgnacioMagic(result);
          if (result.isDeleted) {
            dispatch(banUser(true));
          } else {
            ignacioMagic && dispatch(getuserData(result));
            if (isBanned === true) dispatch(banUser(false));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [user]);
  //-----------------------------------------------------------//

  useEffect(() => {
    if (orderBy === "") dispatch(orderByPrice(orderBy));
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

  /*   const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allProducts1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allProducts1.length / productsPerPage); */
  const productsToDisplay = searchOn ? allProductsSearch : allProducts1;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = productsToDisplay.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productsToDisplay.length / productsPerPage);

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
              <Filter />
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
