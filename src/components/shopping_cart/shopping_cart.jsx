import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cart_item';
import Nav from '../../components/nav/nav'
import './shopping_cart.css';

const ShoppingCart = () => {
    let cart = useSelector(state => state.shoppingCart);
    console.log("productos en carrito: ", cart);
    //FALTA CALCULAR EL TOTAL DE LOS PRODUCTOS EN EL CARRITO SEGÚN SU CANTIDAD SETEADA EN EL COMPONENTE CART_ITEM  

    return (
        <div>
            <Nav />
            {cart.length === 0 ? (<h2>No hay productos en el carrito</h2>) : (
                <div>
                    <div>
                        {cart.map(product => (
                            <CartItem key={product.id} product={product} />
                        ))}
                    </div>
                    <div>
                        <div>
                            <h2>Resumen de compra</h2>    
                        </div>
                        <div>
                            {cart.length === 1 ? (
                                <div>
                                    <h3>Producto</h3>
                                    <p>total</p>
                                </div>
                            ) : (
                                <div>
                                    <h3>Productos</h3>
                                    <p>total</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShoppingCart;