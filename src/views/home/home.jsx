import { useState, useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import Cards from '../../components/cards/cards';
import Paginate from '../../components/paginate/paginate';
import NavBar from '../../components/nav/nav';
import { getAllProducts } from '../../redux/actions';
import Filter from "../../components/filter/filter";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import showCookieBanner from "./cookie-banner";

const Home = () => {
  const allProducts1 = useSelector((state) => state.allProducts1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts1]);

  const userPreference = Cookies.get("themePreference");
  const [theme, setTheme] = useState(userPreference || "light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    Cookies.set("themePreference", newTheme, { expires: 5 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    /* window.scrollTo(0, 400); */ // Scroll hacia arriba
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allProducts1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allProducts1.length / productsPerPage);

  if (allProducts1.length === 0) {
    return (
      <div>
        <NavBar />
        <div>Loading...</div>
      </div>
    );
  }

  return (
      <div>
        <NavBar />
          <span>{showCookieBanner()}</span>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Paginate
         
        currentPage={currentPage}
         
        totalPages={totalPages}
         
        handlePageChange={handlePageChange}
        
      />
      <div style={{ display: "flex", justifyContent: 'center', width: '100%'}}>
        <Filter/>
          <Grid sx={{width: '100%'}}>
          <Cards currentProduct={currentProduct} />
          </Grid>
      </div>
    </div>
  );
};

export default Home;
