import { GET_ALL_PRODUCTS, SEARCH_BY_NAME, ORDER_BY_NAME, ORDER_BY_PRICE, FILTER_ALL } from "./action-types";

const initialState = {
    allProducts1 : [], /* Para filtrar y ordenar */
    allProducts2 : []
}

const reducer = (state = initialState, {type, payload }) =>{
    switch (type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts1: payload,
                allProducts2: payload
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                allProducts1: payload,
            }
        case ORDER_BY_PRICE:
            let productsByPrice = state.allProducts1;
            if(payload === 'asc'){
                productsByPrice = productsByPrice.sort((a, b) => a.price - b.price);
            }
            if(payload === 'desc'){
                productsByPrice = productsByPrice.sort((a, b) => b.price - a.price);
            }
            return {
                ...state,
                allProducts1: productsByPrice
            }
        case ORDER_BY_NAME:
            let productsByName = state.allProducts1;
            if(payload === 'a-z'){
                productsByName = productsByName.sort((a, b) => a.name.localeCompare(b.name));
            }
            if(payload === 'z-a'){
                productsByName = productsByName.sort((a, b) => b.name.localeCompare(a.name));
                
            }
            return {
                ...state,
                allProducts1: products
            }
        case FILTER_ALL:
            console.log(payload)
            return {
                ...state,
                allProducts1: payload
            }
        default:
            return {...state};
    }
}

export default reducer;