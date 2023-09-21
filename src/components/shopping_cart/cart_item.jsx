import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { increaseQuantity, decreaseQuantity } from '../../redux/actions';
import './cart_item.css';

const CartItem = ({ product }) => {
    const { id, name, price, images, quantity } = product;
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
            <div className='cart-item-info'>
                <div className='cart-item-image-container'>
                  <img src={images[0]} className='cart-item-img'/>  
                </div>
                <h2>{name}</h2>
                <p>{price}</p>
                <p>{id}</p>
            </div>
            <div className='cart-item-quantity'>
                <button onClick={handleDecreaseQuantity}>-</button>
                <p>{showQuantity}</p>
                <button onClick={handleIncreaseQuantity}>+</button>
            </div>
            <div className='cart-item-remove'>
                <button onClick={handleRemoveFromCart}>Eliminar del carrito</button>
            </div>
        </div>
    )
}

export default CartItem;