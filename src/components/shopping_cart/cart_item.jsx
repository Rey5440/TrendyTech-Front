import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';

const CartItem = ({ product, onQuantityChange }) => {
    const { id, name, price, images, stock } = product;
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        onQuantityChange(quantity)
    }, [])

    let handleAddQuantity = () => {
        quantity != stock ? setQuantity(quantity + 1) : setQuantity(stock);
        onQuantityChange(quantity);
    }

    let handleRemoveQuantity = () => {
        quantity != 1 ? setQuantity(quantity - 1) : setQuantity(1);
        onQuantityChange(quantity);
    }

    let handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    }

    return (
        <div>
            <div>
                <img src={images[0]} />
                <h2>{name}</h2>
                <p>{price}</p>
                <p>{id}</p>
               
            </div>
            <div>
                <button onClick={handleRemoveQuantity}>-</button>
                <p>{quantity}</p>
                <button onClick={handleAddQuantity}>+</button>
            </div>
            <div>
                <button onClick={handleRemoveFromCart}>Eliminar del carrito</button>
            </div>
        </div>
    )
}

export default CartItem;