import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import CardCarrusel from "./card_carrusel";
import "./carrusel.css";
import "react-multi-carousel/lib/styles.css";

const DetailCarousel = ({ product }) => {
    const products = useSelector((state) => state.allProducts2);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    let cards = () => {
        console.log(product)
        return products.slice(0, 10).map((product) => {
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