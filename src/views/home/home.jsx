import { useState, useEffect } from 'react';
import "./home.css";
import { useSelector } from "react-redux";
import Cards from '../../components/cards/cards';
import Paginate from '../../components/paginate/paginate';

const Home = () => {
  const allProducts = useSelector((state) => state.allProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1)
  }, [allProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    /* window.scrollTo(0, 400); */ // Scroll hacia arriba
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  if (allProducts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <div>
      <Paginate currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
      <Cards currentProduct={currentProduct} />
    </div>
    </div>
  );
};

export default Home;