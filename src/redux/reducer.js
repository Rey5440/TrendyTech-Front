import { GET_ALL_PRODUCTS, SEARCH_BY_NAME, ORDER_BY_NAME, ORDER_BY_PRICE, FILTER_ALL, ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "./action-types";

const initialState = {
    allProducts1 : [], /* Para filtrar y ordenar */
    allProducts2 : [],
    shoppingCart : [],
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
            return {
                ...state,
                allProducts1: payload
            }
        case ADD_TO_CART:
            let found = state.shoppingCart.find(product => product.id === payload.id);
            if(found){
                console.log("ya esta en el carrito");
                return {
                    ...state,
                    shoppingCart: state.shoppingCart
                }
            } else{
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, {...payload, quantity: 1}]
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(product => product.id !== payload)
            }
        case INCREASE_QUANTITY:
            return {
                ...state,
                shoppingCart: state.shoppingCart.map(product => {
                    if(product.id === payload){
                        if(product.quantity < product.stock){
                            product.quantity += 1
                            console.log(product.name, product.quantity)
                        } else {
                            product.quantity = product.stock
                            console.log("no se puede aumentar mas")
                        }
                        return product
                    }
                    return product
                })
            }
        case DECREASE_QUANTITY:
            return {
                ...state,
                shoppingCart: state.shoppingCart.map(product => {
                    if(product.id === payload){
                        if(product.quantity > 1){
                            product.quantity -= 1
                            console.log(product.name, product.quantity)
                        } else {
                            product.quantity = 1
                            console.log("no se puede quitar mas")
                        }
                        return product
                    }
                    return product
                })
            }
        default:
            return {...state};
    }
}

export default reducer;