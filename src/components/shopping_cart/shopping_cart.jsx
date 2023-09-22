import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cart_item';
import Nav from '../../components/nav/nav'
import Footer from '../../views/footer/footer'
import iconoCarrito from '../../assets/online-shopping (1).png';
import './shopping_cart.css';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
    let cart = useSelector(state => state.shoppingCart);
    let [total, setTotal] = useState(0);
    let totalProductsInCart = cart.reduce((acc, product) => acc + product.quantity, 0);

    let handleTotal = () => {
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.quantity;
        });
        setTotal(total);
    }

    useEffect(() => {
        handleTotal();
    }, [cart]);

    return (
        <div className='shopping-cart-container'>
            <Nav />
            {cart.length === 0 ? (<div className='empty-cart-container'>
                <div className='empty-cart'>
                    <img src={iconoCarrito} alt='carrito vacio' className='empty-cart-icon'/>
                    <h2>¡Tu carrito está vacío!</h2>
                    <NavLink to='/home' className='home-button'>Ver productos</NavLink>
                </div>
            </div>) : (
                <div className='cart-container'>
                    <div className='cart'>
                        <div className='cart-items'>
                            <div className='cart-title'><h2>Productos</h2></div>
                            {cart.map(product => (
                                <div>
                                    <CartItem key={product.id} product={product} />
                                </div>
                            ))}
                        </div>
                        <div className='cart-summary-container'>
                            <div className='cart-summary'>
                                <div className='cart-summary-title-container'>
                                    <h2 className='cart-summary-title'>Resumen de compra</h2>
                                </div>
                                <div className='cart-summary-details'>
                                    {cart.length === 1 ? (
                                        <div className='cart-summary-total-container'>
                                            <div className='cart-summary-total-detail'>
                                                <p>Producto</p>
                                                <p>${total}</p>
                                            </div>
                                            <div className='cart-summary-total-detail'>
                                                <p>Envío</p>
                                                <p>Gratis</p>
                                            </div>
                                            <div className='cart-summary-total-detail'>
                                                <h2>Total</h2>
                                                <h2>${total}</h2>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='cart-summary-total-container'>
                                            <div className='cart-summary-total-detail'>
                                                <p>Productos ({totalProductsInCart})</p>
                                                <p>${total}</p>
                                            </div>
                                            <div className='cart-summary-total-detail'>
                                                <p>Envío</p>
                                                <p>Gratis</p>
                                            </div>
                                            <div className='cart-summary-total-detail'>
                                                <h2>Total</h2>
                                                <h2>${total}</h2>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer className='footer' />
        </div>
    )
}

export default ShoppingCart;