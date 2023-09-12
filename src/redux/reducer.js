import { GET_ALL_PRODUCTS, SEARCH_BY_NAME } from "./action-types";

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
        default:
            return {...state};
    }
}

export default reducer;