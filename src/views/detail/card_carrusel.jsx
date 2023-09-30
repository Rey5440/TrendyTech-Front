import React from 'react';
import './card_carrusel.css';

const CardCarrusel = (props) => {
    let { images, id, name, price } = props;

    return(
        <div className="cardCarrousel_container">
            <div className="cardCarrousel_img_container">
                <img src={images[0]} alt={name} className='cardCarrousel_img'/>
            </div>
            <h2 className="cardCarrousel_name">{name}</h2>
            <h2 className="cardCarrousel_price">${price}</h2>
        </div>
    )
}

export default CardCarrusel;