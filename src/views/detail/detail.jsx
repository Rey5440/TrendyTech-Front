import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/nav/nav";
import "./detail.css";
import AlertTech from "../../components/alert/alert";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/${id}`
        );
        const { data } = response;
        setProduct(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [id]);
  console.log(product);
  return (
    <div>
      <AlertTech message='hola calenius' type='success'/>
      <Nav />
      <h1>{product.name}</h1>
      <h3>{product.description}</h3>
      {product.images && (
        <img src={product.images[0]} alt={product.name} width={"300px"} />
      )}
      <h2>$ {product.price}</h2>
      <button>añadir</button>
    </div>
  );
};

export default Detail;
