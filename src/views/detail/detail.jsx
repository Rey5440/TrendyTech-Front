const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../components/nav/nav";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./detail.css";
import { addToCart } from "../../redux/actions";
import Loader from "../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions";//---------> para el setAlert
import AlertTech from '../../components/alert/alert'
import Footer from "../footer/footer"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import DetailCarousel from "./carrusel";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imagePP, setImagePP] = useState();
  const [loading, setLoading] = useState(true);
  const shoppingCart = useSelector(state => state.shoppingCart);
  const isProductInCart = shoppingCart.some(product => product.id === id);

  /* ---------para usar el alert------------- */
  const alertState = useSelector(state => state.alert)
  const dispatch = useDispatch();
  /* ------------------------------------------ */
  // const handleAlert = () => {
  //   dispatch(setAlert("  HOLA CALENEEENIUSS   ", "success"));

  // }
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_URL}/products/${id}`
        );
        const { data } = response;
        setProduct(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        dispatch(setAlert("  el id del producto no existe  ", "error"));
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!hasScrolled) {
      window.scrollTo(0, 0);
      setHasScrolled(true);
    }
  }, [hasScrolled])

  useEffect(() => { }, [imagePP]);
  // Cambiar la imagen principal cuando se haga clic en un botón de imagen
  const carousel = (event) => {
    setImagePP(product.images[event.target.value]);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  }

  return (
    <div>
      <Nav />
      {alertState.visible &&
        <AlertTech message={alertState.message} type={alertState.type} />
      }
      {loading ? (
        <Loader />
      ) : (
        <div className="div_detail">
          <div className="div_container_detail">
            <div className="div_derecha_detail">
              <div className="div_info">
                <p className="nuevo">Nuevo</p>
                <h2 className="nombre">{product.name}</h2>
                <p className="descripcion">{product.description}</p>
                <h2 className="precio">${product.price}</h2>
              </div>

              <div className="div_price_button">
                <Button
                  variant="contained"
                  className="button_agregar"
                  endIcon={<LocalMallIcon />}
                  onClick={handleAddToCart}
                >
                  Agregar al Carrito
                </Button>
                <p className="stock">{product.stock} unidades disponibles</p>
              </div>

              <div className="div_beneficios">
                <p className="beneficio"><KeyboardReturnIcon /> Devolución gratis</p>
                <p className="beneficio"><ShieldOutlinedIcon /> Compra protegida</p>
                <p className="beneficio"><WorkspacePremiumOutlinedIcon /> 12 meses de garantía de fábrica</p>
              </div>
            </div>

            <div className="div_imagenes">
              <div className="imgP_Container">
                {product.images && (
                  <div className="imagenPrincipal_container">
                    <img
                      className="imagenPrincipal"
                      src={imagePP || product.images[0]}
                      alt={product.name}
                    />
                  </div>
                )}
              </div>

              <div>
                {product.images &&
                  product.images.map((imag, index) => (
                    <div className="imagen_container" key={index}>
                      <button onClick={carousel} value={index} className="boton_imagen">
                        <img
                          src={imag}
                          className="product_image"
                        />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <h2 className="relacionados">Productos relacionados</h2>
          <div className="div_carrusel">
            <DetailCarousel product={product} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Detail;