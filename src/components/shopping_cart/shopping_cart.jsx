const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

initMercadoPago("TEST-185b7434-044a-4830-995d-95780e762ec5");
const ShoppingCart = () => {
  const cart = useSelector((state) => state.shoppingCart);
  const [total, setTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null);
  const [button, setButton] = useState(false);
  const totalProductsInCart = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const { user } = useAuth0();
  const { auth } = useAuth();

  // Inicio de compra mp
  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      await createNewOrder();
    }
    setButton(true);
  };

  const createNewOrder = async () => {
    let id = "";

    if (user) {
      id = user.id;
    } else if (auth) {
      id = auth.id;
    }

    const obj = {
      products: cart,
      userId: id,
      total: total,
    };
    console.log(obj);
    const response = await axios.post(`${VITE_BACKEND_URL}/orders/create`, obj);
    console.log(response);
    return;
  };

  const createPreference = async () => {
    let productos = cart.map((product) => {
      return {
        id: product.id,
        title: product.name,
        unit_price: Number(product.price),
        picture_url: product.images[0],
        quantity: Number(product.quantity),
      };
    });

    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/checkout/create_preference`,
        { productos }
      );
      const id = response.data;
      return id; //id de compra solo eso
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
                <div>
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
