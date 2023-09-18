import React from "react";
import CookieBanner from "./cookieBanner";

const ShowCookieBanner = () => {
  const message = `Este sitio portal es propiedad de TrendyTech y utiliza cookies. Si continuas navegando, consideramos que aceptas su uso.`;

  const options = {
    acceptLabel: "Aceptar",
    rejectLabel: "Rechazar",
  };

  return <CookieBanner message={message} options={options} />;
};

export default ShowCookieBanner;
