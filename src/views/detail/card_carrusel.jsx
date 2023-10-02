import React from 'react';
import { NavLink } from 'react-router-dom';
import './card_carrusel.css';

const CardCarrusel = ({prod}) => {
    let { images, id, name, price } = prod;

    const truncateName = (name, maxWords) => {
        const words = name.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return name;
    }

    const truncatedName = truncateName(name, 3);

    return (
        <div className="cardCarrousel_container">
            <div className="cardCarrousel_img_container">
                <img src={`${images[0]}`} alt={name} className='cardCarrousel_img' />    
            </div>
            <div classname="name_container">
                <p className="cardCarrousel_name">{truncatedName}</p>
            </div>
            <div classname="price_container">
                <p className="cardCarrousel_price">${price}</p>
            </div>
        </div>
    )
}

export default CardCarrusel;