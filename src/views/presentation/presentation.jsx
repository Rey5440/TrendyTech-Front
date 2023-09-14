import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../../components/nav/nav";
import banner1 from "../../assets/banner-publicitario-1.png";
import banner2 from "../../assets/banner-publicitario-2.png";
import banner3 from "../../assets/banner-publicitario-3.png";

const Presentation = () => {
  //hacer peticion a /users/:id para traer al admin que deberia tener una prop con las imagenes publicitarias//
  //importar componente <Card/> para el carrousel de last products//
  //peticion del timestamps para sacar los ultimos productos de hasta 15 dias de antiguedad//
  
  const [banners, setBanners] = useState(banner1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (banners === banner1) {
        setBanners(banner2);
      }
      if (banners === banner2) {
        setBanners(banner3);
      }
      if (banners === banner3) {
        setBanners(banner1);
      }
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [banners]);

  return (
    <div>
      <Nav />
      <NavLink to="/home">
        <button>Ingresar</button>
      </NavLink>
      <div>
        <img src={banners} alt="banner" />
      </div>
      <div>
        <h2>Productos destacados</h2>
        carrousel
      </div>
    </div>
  );
};

export default Presentation;
