import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';

const CartItem = ({ product }) => {
    const { id, name, price, images, stock } = product;
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    let handleAddQuantity = () => {
        quantity != stock ? setQuantity(quantity + 1) : setQuantity(stock);
    }

    let handleRemoveQuantity = () => {
        quantity != 1 ? setQuantity(quantity - 1) : setQuantity(1);
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