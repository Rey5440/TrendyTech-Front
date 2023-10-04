export const toFormatPrice = (price) => {
  const formatter = new Intl.NumberFormat("es-ar", {
    style: "currency",
    currency: "ARS", // Puedes ajustar la moneda según tu necesidad
  });

  const formattedPrice = formatter.format(price);
  return formattedPrice;
};


export const toAplicateDiscount = (price, discount) => {
  const priceWithDiscount = price - (price * (discount / 100));
  return priceWithDiscount;
}