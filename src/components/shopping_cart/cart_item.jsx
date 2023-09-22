import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { increaseQuantity, decreaseQuantity } from '../../redux/actions';
import './cart_item.css';

const CartItem = ({ product }) => {
    const { id, name, price, images, stock, quantity } = product;
    const [showQuantity, setShowQuantity] = useState(quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        setShowQuantity(quantity);
    }, [quantity]);

    let handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(id));
    }

    let handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity(id));
    }

    let handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    }

    return (
        <div className='cart-item-container'>
            <div className='cart-item-image-container'>
                <img src={images[0]} className='cart-item-img' />
            </div>
            <div className='cart-item-details'>
                <div className='cart-item-name'>
                    <h2>{name}</h2>
                </div>
                <div className='cart-item-remove'>
                    <button onClick={handleRemoveFromCart} className='buttonR'>Eliminar del carrito</button>
                </div>
            </div>
            <div className='cart-item-quantity-buttons'>
                <button onClick={handleDecreaseQuantity} disabled={showQuantity === 1} className='buttonQ'>-</button>
                <p className='cart-item-quantity'>{showQuantity}</p>
                <button onClick={handleIncreaseQuantity} disabled={showQuantity === stock} className='buttonQ'>+</button>
            </div>
            <div className='cart-item-price'>
                <p>${price}</p>    
            </div>
            

        </div>
    )
}

export default CartItem;