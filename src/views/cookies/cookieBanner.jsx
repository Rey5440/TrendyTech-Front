import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./cookiesBanner.css";
import style from "@emotion/styled";

const StyledMessage = style.div`
  flex: 1;
  font-size: 21px; 
  color: #000; 
  font-family:Helvetica, sans-serif;
  line-height:1.5;
  font-style:nitalic;
`;

const CookieBanner = ({ message, options }) => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ha aceptado las cookies previamente
    const userAccepted = Cookies.get("acceptedCookies");
    if (userAccepted === "true") {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    // Establecer una cookie que registra la aceptación del usuario
    Cookies.set("acceptedCookies", "true", { expires: 20 });
    setAccepted(true);
  };

  const handleReject = () => {
    // Establecer una cookie que registra el rechazo del usuario
    Cookies.set("acceptedCookies", "false", { expires: 20 });
    setAccepted(true); // Cambiar a true para ocultar el banner
  };

  if (accepted) {
    return null; // No mostrar el banner si el usuario ha aceptado las cookies
  }

  return (
    <div className="cookie-banner">
      <StyledMessage>{message}</StyledMessage>
      <div className="cookie-actions">
        <button className="accept-button" onClick={handleAccept}>
          {options.acceptLabel}
        </button>
        <button className="reject-button" onClick={handleReject}>
          {options.rejectLabel}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
