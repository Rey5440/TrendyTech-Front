import axios from "axios";
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
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "./action-types";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const all = await axios(`http://localhost:3004/products`);
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
        `http://localhost:3004/products/?name=${product}`
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

export const addToFavorites = (product, userId) => {
  return async function (dispatch) {
    try {
      const getProduct = await axios.post(`http://localhost:3004/favorites/`, {
        product,
        userId,
      });

      dispatch({
        type: ADD_TO_FAVORITES,
        payload: getProduct.data.result,
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };
};

export const removeFromFavorites = (product, userId) => {

  return async function (dispatch) {
    try {
      const result = await axios.post(`http://localhost:3004/favorites/delete/`, {
        product,
        userId
      });
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: result.data.result
      });
    } catch (error) {
      console.error("Error al quitar de favoritos:", error);
    }
  };
};


