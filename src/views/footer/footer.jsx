import React, { useState } from "react";
import Logo from "../../assets/Trendy-Tech logo recortado.png";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const [inputEmail, setInputEmail] = useState("");

  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const handleInputEmail = (event) => {
    setInputEmail(event.target.value);
  };

  return (
    <footer className="foo">
      <div className="row">
        <div className="col">
          <img src={Logo} alt="Logo img" className="logo" />
          <p>Trendy Tech es una página de ventas de Productos electrónicos</p>
        </div>
        <div className="col">
          <h3>
            Office
            <div className="under">
              <span></span>
            </div>
          </h3>
          <p>Buenos Aires, Argentina</p>
          <p>Avenida Corrientes 3000</p>
          <p className="email">trendytechdev@gmail.com</p>
          <h4>+54-0123456789</h4>
        </div>
        <div className="col">
          <h3>
            Links
            <div className="under">
              <span></span>
            </div>
          </h3>
          <ul>
            <NavLink to="/home" style={{ textDecoration: "none" }}>
              <li>Home</li>
            </NavLink>
            <NavLink to="/sobre-nosotros" style={{ textDecoration: "none" }}>
              <li>Sobre Nosotros</li>
            </NavLink>
            <NavLink to="/" style={{ textDecoration: "none" }} onClick={scroll}>
              <li>Novedades</li>
            </NavLink>
            <NavLink
              to="/preguntas-frecuentes"
              style={{ textDecoration: "none" }}>
              <li>Preguntas Frecuentes</li>
            </NavLink>
          </ul>
        </div>
        <div className="col">
          <h3>
            Newsletter
            <div className="under">
              <span />
            </div>
          </h3>
          <form>
            <MarkunreadIcon
              className="icono"
              color="primary"
              sx={{ fontSize: 18 }}
            />
            <input
              id="email"
              type="email"
              value={inputEmail}
              placeholder="Ingrese su email..."
              required
              className="footer-input"
              onChange={handleInputEmail}
              autoComplete="true"
            />
            <button type="submit">
              <SendSharpIcon color="primary" sx={{ fontSize: 18 }} />
            </button>
          </form>
          <div className="social">
            <FacebookIcon />
            <TwitterIcon />
            <WhatsAppIcon />
          </div>
        </div>
      </div>
      <hr />
      <p className="copy">
        &copy;2023 Trendy Tech, todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
