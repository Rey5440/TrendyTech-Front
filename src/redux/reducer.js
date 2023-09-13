import { GET_ALL_PRODUCTS } from "./action-types";

const initialState = {
    allProducts1 : [],
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
        default:
            return {...state};
    }
}

export default reducer;