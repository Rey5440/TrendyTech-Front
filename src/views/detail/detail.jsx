import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../components/nav/nav";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./detail.css";
import { Box, Container } from "@mui/system";

import Loader from "../../components/loader/loader";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imagePP, setImagePP] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/${id}`
        );
        const { data } = response;
        setProduct(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {}, [imagePP]);
  // Cambiar la imagen principal cuando se haga clic en un botón de imagen
  const carousel = (event) => {
    setImagePP(product.images[event.target.value]);
  };
  return (
    <div>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ marginTop: "30px" }}>
          <div className="div_container_detail">
            <div className="div_derecha_detail">
              <Box sx={{ padding: "10px", width: "100%" }}>
                <hr />
                <h1>{product.name}</h1>
                <br />
                <hr />
                <h2>{product.description}</h2>
                <hr />
                <br />
                <h2>Stock:{product.stock} u.</h2>
                <hr />
              </Box>

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
            </div>

          <Container sx={{ display: "flex", width: "100%" }}>
            {product.images && (
              <img
                className="product_image_focus"
                src={imagePP || product.images[0]}
                alt={product.name}
              />
            )}
            <Box
              sx={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {product.images &&
                product.images.map((imag, index) => (
                  <Button
                    style={{
                      backgroundImage: `url(${imag})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "100%",
                      backgroundColor: "white",
                      width: "90%",
                      height: "100%",
                      margin: "6px",
                    }}
                    key={index}
                    value={index}
                    onClick={carousel}
                  />
                ))}
            </Box>
          </Container>
        </div>
      </Container>  
    </div>
  );
};

export default Detail;
