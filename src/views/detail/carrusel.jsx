import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import CardCarrusel from "./card_carrusel";
import "react-multi-carousel/lib/styles.css";

const DetailCarousel = ({ product }) => {
    const products = useSelector((state) => state.allProducts2);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    let cards = () => {
        return products.map((product) => {
            return <CardCarrusel key={product.id} prod={product} />
        });
    }

    return (
        <div className="carrusel_container">
            <Carousel responsive={responsive}>
                {cards()}
            </Carousel>
        </div>
    )
}

export default DetailCarousel;