import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cart_item';
import Nav from '../../components/nav/nav'
import './shopping_cart.css';

const ShoppingCart = () => {
    let cart = useSelector(state => state.shoppingCart);
    let [total, setTotal] = useState(0);
    console.log("productos en carrito: ", cart);
    //FALTA CALCULAR EL TOTAL DE LOS PRODUCTOS EN EL CARRITO SEGÚN SU CANTIDAD SETEADA EN EL COMPONENTE CART_ITEM  

    const onQuantityChange = (quantity) => {
        setTotal(cart.reduce((acc, product) => acc + product.price * quantity, 0));
    }

    return (
        <div>
            <Nav />
            {cart.length === 0 ? (<h2>No hay productos en el carrito</h2>) : (
                <div className='cart'>
                    <div className='cart-items'>
                        {cart.map(product => (
                            <div>
                                <CartItem key={product.id} product={product} onQuantityChange={onQuantityChange}/>    
                            </div>
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
                                    <p>{total}</p>
                                </div>
                            ) : (
                                <div>
                                    <h3>Productos</h3>
                                    <p>{total}</p>
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