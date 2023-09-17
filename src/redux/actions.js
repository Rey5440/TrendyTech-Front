import axios from 'axios';
import { GET_ALL_PRODUCTS, SEARCH_BY_NAME, ORDER_BY_NAME, ORDER_BY_PRICE } from './action-types';

export const getAllProducts = () => {
    return async function (dispatch) {
        try {
            const allProducts = await axios(`http://localhost:3004/products`);
            const allBrands = await axios(`http://localhost:3004/products/brands`);
            const allTypes = await axios(`http://localhost:3004/products/types`);

            const prodData = allProducts.data;
            const brandsData = allBrands.data;
            const typesData = allTypes.data;

            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: {
                    products: prodData,
                    brands: brandsData,
                    types: typesData
                }
            });
        } catch (error) {
            console.log(error);
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

//http://localhost:3004/products/filter?color=1&type=1&brand=3&minPrice=100&maxPrice=100000
// ejemplo de ruta pata filtro combinado