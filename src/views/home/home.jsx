import { useState, useEffect } from 'react';
import "./home.css";
import { useSelector } from "react-redux";
import Cards from '../../components/cards/cards';
import Paginate from '../../components/paginate/paginate';

const Home = () => {
  const allProducts1 = useSelector((state) => state.allProducts1);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1)
  }, [allProducts1]);

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