import axios from 'axios';
import { GET_ALL_PRODUCTS, SEARCH_BY_NAME, ORDER_BY_NAME, ORDER_BY_PRICE, FILTER_ALL } from './action-types';

export const getAllProducts = ()=>{
    return async function (dispatch) {
        try{
            const all = await axios(`http://localhost:3004/products`);
            return dispatch({
                type:GET_ALL_PRODUCTS,
                payload: all.data
            })
        }catch (error) {
            console.log(error)
        }
    }
}

export const searchByName = (product) => {
    return async function (dispatch) {
        console.log(product)
        try{
            const foundProduct = await axios(`http://localhost:3004/products/?name=${product}`);
            console.log(foundProduct.data)
            return dispatch({
                type:SEARCH_BY_NAME,
                payload: foundProduct.data
            })
        }catch (error) {
            console.log("searchByName error: ", error.message);
        }
    }
}

export const orderByPrice = () => {
    return {
        type: ORDER_BY_PRICE
    }
}

export const orderByName = () => {
    return {
        type: ORDER_BY_NAME
    }
}

/* export const filterByColor = () => {
    return {
        type: FILTER_BY_COLOR
    }
} */

export const filterAll = (payload) => {
    return async function (dispatch) {
        try{
            const response = await axios(`http://localhost:3004/products/filter?color=&type=${payload.type}&brand=${payload.brand}&minPrice=${payload.minPrice}&maxPrice=${payload.maxPrice}`);
            return dispatch({
                type:FILTER_ALL,
                payload: response.data
            })
        }catch (error) {
            console.log("Type Error: ", error.message);
        }
    }
}

//http://localhost:3004/products/filter?color=1&type=1&brand=3&minPrice=100&maxPrice=100000
// ejemplo de ruta pata filtro combinado