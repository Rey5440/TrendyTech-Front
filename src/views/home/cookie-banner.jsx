import React from "react";
import CookieBanner from "./cookieBanner";

function showCookieBanner() {
  const cookies = [
    {
      name: "themePreference",
      purpose: "Stores the user's preferred theme",
      expires: 5,
    },
    {
      name: "currentPage",
      purpose: "Stores the current page number",
      expires: 5,
    },
  ];

  const message = `
    Este sitio web utiliza cookies para proporcionar una mejor experiencia de usuario.

    Las cookies necesarias son esenciales para el funcionamiento del sitio web. Las cookies de rendimiento se utilizan para recopilar información sobre cómo los usuarios utilizan el sitio web. Las cookies de marketing se utilizan para mostrar anuncios relevantes a los usuarios.

    ¿Aceptas las cookies?
  `;

  const options = {
    acceptLabel: "Aceptar",
    rejectLabel: "Rechazar",
    closeLabel: "Cerrar",
  };

  return (
    <div>
      <CookieBanner cookies={cookies} message={message} options={options} />
    </div>
  );
}

export default showCookieBanner;
