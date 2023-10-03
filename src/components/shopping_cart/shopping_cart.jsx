const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cart_item";
import Nav from "../../components/nav/nav";
import Footer from "../../views/footer/footer";
import iconoCarrito from "../../assets/online-shopping (1).png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./shopping_cart.css";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../context-client/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { setAlert } from "../../redux/actions";
import AlertTech from "../alert/alert";

initMercadoPago("TEST-185b7434-044a-4830-995d-95780e762ec5");
const ShoppingCart = () => {
  const cart = useSelector((state) => state.shoppingCart);
  const alertState = useSelector((state) => state.alert);
  const [total, setTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null);
  const [button, setButton] = useState(false);
  const totalProductsInCart = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const collection_status = queryParams.get("collection_status");
  const merchant_order_id = queryParams.get("merchant_order_id");

  const { user } = useAuth0();
  const { auth } = useAuth();
  const [client, setClient] = useState({});
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let emailToSend;

      if (auth && auth.email) {
        emailToSend = auth.email;
      } else if (user && user.email) {
        emailToSend = user.email;
      }

      if (emailToSend) {
        try {
          const result = await axios.get(
            `${VITE_BACKEND_URL}/users/email/${emailToSend}`
          );
          setClient(result.data);
        } catch (error) {
          console.error("Error al obtener datos del usuario", error);
        }
      }
    };
    fetchData();
  }, [auth, user]);

  const putApproved = async () => {
    cart.map(({stock}) => {
      setStock(stock - 1)
    })
    console.log(stock);
    const response = await axios.put(
      `${VITE_BACKEND_URL}/orders/update/${client.id}`,
      {
        status: collection_status,
        ticket: merchant_order_id,
      }
    );

    return;
  };

  if (collection_status === "approved") {
    putApproved();
  }

  // Inicio de compra mp
  const handleBuy = async () => {
    // Verifica si esta logueado
    if (!client.id) {
      dispatch(
        setAlert("Debes estar logueado para efectuar la compra.", "warning")
      );
      return;
    }

    // Crea la preferencia de mercado pago
    const id = await createPreference(cart);
    if (id) {
      setPreferenceId(id);
      await createNewOrder();
    }
    setButton(true);
  };

  const createNewOrder = async () => {
   
    const obj = {
      products: cart,
      userId: client.id,
      total: total,
    };
    const response = await axios.post(`${VITE_BACKEND_URL}/orders/create`, obj);
    return;
  };

  const createPreference = async () => {
    console.log(cart);
    const productos = cart.map((product) => {
      return {
        id: product.id,
        title: product.name,
        unit_price: Number(product.price),
        picture_url: product.images[0],
        quantity: Number(product.quantity),
      };
    });

    try {
      // Post a mercado pago
      const response = await axios.post(
        `${VITE_BACKEND_URL}/checkout/create_preference`,
        { productos }
      );

      // Creacion de carrito ( order )
      const ordenPost = await axios.post(`${VITE_BACKEND_URL}/orders/create`, {
        products: cart,
        userId: client.id,
        total,
      });

      const id = response.data;
      return id; //preference id
    } catch (error) {
      console.log(error);
    }
  };
  // ! fin de compra mp

  let handleTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotal(total);
  };

  useEffect(() => {
    handleTotal();
  }, [cart]);

  return (
    <div className="shopping-cart-container">
      <Nav />
      {alertState.visible && (
        <AlertTech message={alertState.message} type={alertState.type} />
      )}
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart">
            <img
              src={iconoCarrito}
              alt="carrito vacio"
              className="empty-cart-icon"
            />
            <h2>¡Tu carrito está vacío!</h2>
            <NavLink to="/home" className="home-button">
              Ver productos
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart">
            <div className="cart-items">
              <div className="cart-title">
                <h2>Productos</h2>
              </div>
              {cart.map((product) => (
                <div key={product.id}>
                  <CartItem key={product.id} product={product} />
                </div>
              ))}
            </div>
            <div className="cart-summary-container">
              <div className="cart-summary">
                <div className="cart-summary-title-container">
                  <h2 className="cart-summary-title">Resumen de compra</h2>
                </div>
                <div className="cart-summary-details">
                  {cart.length === 1 ? (
                    <div className="cart-summary-total-container">
                      <div className="cart-summary-total-detail">
                        <p>Producto</p>
                        <p>${total}</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <p>Envío</p>
                        <p>Gratis</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <h2>Total</h2>
                        <h2>${total}</h2>
                      </div>
                      <div className="cart-summary-total-button">
                        <button
                          onClick={handleBuy}
                          disabled={button}
                          className="confirm-button"
                        >
                          {button ? "Confirmado" : "Confirmar compra"}
                        </button>
                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId }}
                            visible={button}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="cart-summary-total-container">
                      <div className="cart-summary-total-detail">
                        <p>Productos ({totalProductsInCart})</p>
                        <p>${total}</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <p>Envío</p>
                        <p>Gratis</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <h2>Total</h2>
                        <h2>${total}</h2>
                      </div>
                      <div className="cart-summary-total-button">
                        <button
                          onClick={handleBuy}
                          disabled={button}
                          className="confirm-button"
                        >
                          {button ? "Confirmado" : "Confirmar compra"}
                        </button>
                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId }}
                            visible={button}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer className="footer" />
    </div>
  );
};

export default ShoppingCart;
