export const toFormatPrice = (price) => {
  const formatter = new Intl.NumberFormat("es-ar", {
    style: "currency",
    currency: "ARS", // Puedes ajustar la moneda según tu necesidad
  });

  const formattedPrice = formatter.format(price);
  return formattedPrice;
};
