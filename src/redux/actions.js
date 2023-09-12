import axios from 'axios';
import { GET_ALL_PRODUCTS } from './action-types';

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
