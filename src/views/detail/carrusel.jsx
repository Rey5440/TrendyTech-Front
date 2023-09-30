import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import Carousel from "react-multi-carousel";
import CardCarrusel from "./card_carrusel";
import "react-multi-carousel/lib/styles.css";

const DetailCarousel = ({product}) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts2);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    
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

    return (
        <Carousel responsive={responsive} className="carrusel">
            {products.map((prod) => (
                console.log(prod),
                <CardCarrusel key={prod.id} images={prod.images} id={prod.id} name={prod.name} price={prod.price} />
            ))}
        </Carousel>
    )
}

export default DetailCarousel;