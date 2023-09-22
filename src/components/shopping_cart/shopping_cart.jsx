import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cart_item';
import Nav from '../../components/nav/nav'
import Footer from '../../views/footer/footer'
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react' 
import './shopping_cart.css';

initMercadoPago('TEST-185b7434-044a-4830-995d-95780e762ec5');
const ShoppingCart = () => {
    let cart = useSelector(state => state.shoppingCart);
    let [total, setTotal] = useState(0);
    let [preferenceId, setPreferenceId] = useState(null);
    let totalProductsInCart = cart.reduce((acc, product) => acc + product.quantity, 0);
    
    // Inicio de compra mp
    const handleBuy=async()=>{
        const id=await createPreference(cart);
        if(id) {setPreferenceId(id)}
      }
    const createPreference = async (cart) => {
        let productos=cart.map((product)=>{
            return {
                title:product.name,
                unit_price:Number(product.price),
                picture_url:product.images[0],
                quantity:Number(product.quantity),
            }
        })
        try {
            const response= await axios.post('http://localhost:3004/checkout/create_preference',{productos});
            const id=response.data
            return id;//id de compra solo eso
        } catch (error) {
            console.log(error)
        }
    }
    // ! fin de compra mp
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
            {cart.length === 0 ? (<h2>No hay productos en el carrito</h2>) : (
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
                                        <div>
                                            <h3>Producto</h3>
                                            <p>${total}</p>
                                            <button onClick={handleBuy}>Confirmacion</button>
                                            {console.log(preferenceId)}{preferenceId && <Wallet initialization={{preferenceId:preferenceId}}/>}
                                            
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>Productos ({totalProductsInCart})</h3>
                                            <p>${total}</p>
                                            <button onClick={handleBuy}>Confirmacion</button>
                                            {preferenceId && <Wallet initialization={{preferenceId}}/>}
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