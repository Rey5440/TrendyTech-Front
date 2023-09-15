import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../components/nav/nav";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imagePP, setImagePP] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/${id}`
        );
        const { data } = response;
        setProduct(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {}, [imagePP]);
  // Cambiar la imagen principal cuando se haga clic en un botón de imagen
  const carousel = (event) => {
    setImagePP(product.images[event.target.value]);
  };
  console.log(product);
  return (
    <div>
      <Nav />
      <div className="div_container_detail">
        <div className="div_izquierda_detail">
          <div className="subdiv_img">
            {product.images && (
              <img
                className="product_image_focus"
                src={imagePP || product.images[0]}
                alt={product.name}
              />
            )}
          </div>
          <div className="divImage">
            {product.images &&
              product.images.map((imag, index) => (
                <button
                  style={{
                    backgroundImage: `url(${imag})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "200px",
                    height: "200px",
                    margin: "6px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  // className="img_button_carousel"
                  key={index}
                  value={index}
                  onClick={carousel}
                />
              ))}
          </div>
        </div>
        <div className="div_derecha_detail">
          <h1 className="h1_detail">{product.name}</h1>
          <hr className="hr_detail" />
          <h3 className="h3_detail">{product.description}</h3>
          <h2 className="h2_stock_detail">stock: {product.stock} u.</h2>
          <div className="div_price_button">
          <h2 className="h2_price_detail">$ {product.price}.-</h2>

          <Button
            variant="contained"
            className="button_agregar"
            endIcon={<LocalMallIcon />}
          >
            Agregar
          </Button>
          </div>
          <hr className="hr2_detail" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
