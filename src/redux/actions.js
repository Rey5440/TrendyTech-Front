import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import {
  GET_ALL_PRODUCTS,
  SEARCH_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  FILTER_ALL,
  SHOW_ALERT,
  HIDE_ALERT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  USER_DATA,
  SET_OPEN_MODAL_LOGIN,
} from "./action-types";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const all = await axios(`${VITE_BACKEND_URL}/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: all.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchByName = (product) => {
  return async function (dispatch) {
    console.log(product);
    try {
      const foundProduct = await axios(
        `${VITE_BACKEND_URL}/products/?name=${product}`
      );
      console.log(foundProduct.data);
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: foundProduct.data,
      });
    } catch (error) {
      console.log("searchByName error: ", error.message);
    }
  };
};

export const orderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload: payload,
  };
};

export const orderByName = () => {
  return {
    type: ORDER_BY_NAME,
  };
};

/* export const filterByColor = () => {
    return {
        type: FILTER_BY_COLOR
    }
} */

export const filterAll = (payload) => {
  return function (dispatch) {
    return dispatch({
      type: FILTER_ALL,
      payload: payload,
    });
  };
};

export const setAlert = (message, type) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        message,
        type,
      },
    });

    // Limpia el alerta después de 3 segundos
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 3000);
  };
};

//http://localhost:3004/products/filter?color=1&type=1&brand=3&minPrice=100&maxPrice=100000
// ejemplo de ruta pata filtro combinado

export const addToCart = (product) => {
  console.log("producto añadido al carrito: ", product);
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const increaseQuantity = (id) => {
  return {
    type: INCREASE_QUANTITY,
    payload: id,
  };
};

export const decreaseQuantity = (id) => {
  return {
    type: DECREASE_QUANTITY,
    payload: id,
  };
};

export const getuserData = (payload) => {
  console.log(payload);
  return {
    type: USER_DATA,
    payload: payload,
  };
};

export const banUser = (payload) => {
  console.log(payload);
  return {
    type: SET_OPEN_MODAL_LOGIN,
    payload: payload,
  };
};