import React from "react";
import CookieBanner from "./cookieBanner";

const ShowCookieBanner = () => {
  const message = `Al navegar en este sitio propiedad de TrendyTech, aceptas las cookies que utilizamos para mejorar tu experiencia.`;

  const options = {
    acceptLabel: "Aceptar",
    rejectLabel: "Rechazar",
  };

  return <CookieBanner message={message} options={options} />;
};

export default ShowCookieBanner;
