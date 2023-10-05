import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardMedia, Typography } from "@mui/material/";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { toFormatPrice } from "../../helpers/toFormatPrice";

//favorito----------------------
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/actions/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//---------------------------
export default function CardTech({
  images,
  id,
  name,
  price,
  discount,
  product,
  isFavorite,
  auth,
}) {
  const [priceCommon, setPriceCommon] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const userData = useSelector((state) => state.userData);

  //------formateamos el precio con puntos y comas----/
  // if (discount > 0) {
  //   const priceWithDiscount = toAplicateDiscount(price, discount);
  //  const formattedPriceDiscount = toFormatPrice(priceWithDiscount);
  // } else {
  //   return formattedPrice;
  // }

  useEffect(() => {
    if (discount > 0) {
      const formatPriceDiscount = toFormatPrice(price, discount);
      setPriceDiscount(formatPriceDiscount);
      const formattedPrice = toFormatPrice(price);
      setPriceCommon(formattedPrice);
    } else {
      const formattedPrice = toFormatPrice(price);
      setPriceCommon(formattedPrice);
    }
  }, []);

  //--------Nuevo Favoritos---------------//
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    let userId;

    if (auth && auth.id) {
      userId = auth.id;
    } else if (userData && userData.id) {
      userId = userData.id;
    }

    console.log(
      "Este es el usuario que se manda cuando quiere meter o sacar",
      userId
    );
    console.log(isFavorite);

    if (userId) {
      if (!isFavorite) {
        dispatch(addToFavorites(product, userId));
      } else {
        dispatch(removeFromFavorites(product, userId));
      }
    } else {
      console.log("Usted no está logueado");
    }
  };

  return (
    <Card
      sx={{
        height: "300px",
        padding: "4px",
        display: "flex",
        justifyContent: "center",
        boxSizing: "content-box",
      }}
    >
      <span
        role="button"
        onClick={handleAddToFavorites}
        style={{ cursor: "pointer" }}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </span>
      <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <Box sx={{ height: "50%", width: "100%" }}>
          <CardMedia
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            component="img"
            image={images[0]}
            alt={name}
          />
        </Box>
        <Box
          sx={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              maxHeight: "80px",
              fontFamily: "Poppins",
            }}
          >
            {name}
          </Typography>
          {priceDiscount ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "white",
                paddingTop: "4px",
                position: "relative",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  position: "absolute",
                  top: "-65%",
                  right: "-0%",
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                  alignSelf: "center",
                  width: "120px",
                  height: "40px",
                  borderRadius: "25px",
                  backgroundColor: "#ffffff",
                  color: "#fd6f09",
                }}
              >
                {priceDiscount}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  position: "absolute",
                  top: "15%",
                  right: "0%",
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  width: "45px",
                  height: "45px",
                  borderRadius: "25px",
                  backgroundColor: "white",
                  color: "#fd6f09",
                }}
              >
                %{discount}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  width: "120px",
                  height: "40px",
                  backgroundColor: "#007bff",
                  borderRadius: "4px",
                  color: "#d2d2d2",
                  textDecoration: "line-through",
                }}
              >
                {priceCommon}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "white",
                paddingTop: "4px",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  width: "120px",
                  height: "40px",
                  backgroundColor: "#007bff",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {priceCommon}
              </Typography>
            </Box>
          )}
        </Box>
      </NavLink>
    </Card>
  );
}
