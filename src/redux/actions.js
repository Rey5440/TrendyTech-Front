import axios from 'axios';
import { GET_ALL_PRODUCTS, SEARCH_BY_NAME } from './action-types';

export const getAllProducts = ()=>{
    return async function (dispatch) {
        try{
            const all = await axios(`http://localhost:3004/products`);
            console.log(all)
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
        try{
            const foundProduct = await axios(`http://localhost:3004/products/name?=${product}`);
            return dispatch({
                type:SEARCH_BY_NAME,
                payload: foundProduct.data
            })
        }catch (error) {
            console.log("searchByName error: ", error.message);
        }
    }
}