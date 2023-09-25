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
import autenticateAllUsers from "../../components/helpers/autenticateAllUsers";

const Home = () => {
  const allProducts1 = useSelector((state) => state.allProducts1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  //-------------------------------//
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // No necesitas getUserDataFromCookie aquí, se maneja en el contexto de autenticación
        if (isAuthenticated) {
          const isGoogleUser = user.sub.includes("google-oauth2");
          if (isGoogleUser) {
            console.log("Usuario de Google");
          } else {
            console.log("Usuario común");
          }
        }
      } catch (error) {
        console.error(
          "Error al obtener los datos del usuario desde la cookie:",
          error
        );
      }
    };
    fetchData(); // Llama a la función fetchData

    user && autenticateAllUsers(user, isAuthenticated);
  }, [user, autenticateAllUsers]);
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
          style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Container style={{ display: "flex", padding: "20px" }}>
            <Filter />
            <Grid sx={{ width: "80%" }}>
              <Cards currentProduct={currentProduct} />
            </Grid>
          </Container>
        </div>
      )}
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default Home;
