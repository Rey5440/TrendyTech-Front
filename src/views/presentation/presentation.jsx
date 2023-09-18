import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../components/nav/nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import banner1 from "../../assets/banner-publicitario-1.png";
import banner2 from "../../assets/banner-publicitario-2.png";
import banner3 from "../../assets/banner-publicitario-3.png";
import "./presentation.css";
import ShowCookieBanner from "../cookies/cookie-banner";

const images = [banner1, banner2, banner3];
const images2 = [
  banner1,
  banner2,
  banner3,
  banner1,
  banner2,
  banner1,
  banner2,
  banner3,
  banner1,
  banner2,
];

const Presentation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      selectNewImage(selectedIndex, images);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [selectedImage]);

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 200);
  };

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, images);
  };

  return (
    <>
      <Nav />
      <div className="div_container_presentation">
        <div className="button_presentation">
          <NavLink to="/home">
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: "50px" }}
              endIcon={<RocketLaunchIcon />}>
              Ingresar
            </Button>
          </NavLink>
        </div>
        <div className="div_image_carrusel">
          <img
            src={selectedImage}
            alt="publicidad"
            className={`carousel_img ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
          />
          <div>
            <div className="carousel_button_prev">
              <Button
                startIcon={<ArrowBackIosNewIcon />}
                onClick={previous}></Button>
            </div>
            <div className="carousel_button_next">
              <Button endIcon={<ArrowForwardIosIcon />} onClick={next}></Button>
            </div>
          </div>
        </div>
        <ShowCookieBanner />
        <div className="div_container_carrousel2">
          <h2>Productos de novedad</h2>
          <hr className="hr_presentation" />
          <div className="div_carrousel_latest">
            <Slider {...settings}>
              {images2.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Imagen ${index}`}
                    className="carousel-item"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <hr className="hr_presentation" />
        </div>
      </div>
    </>
  );
};

export default Presentation;
