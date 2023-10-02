import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/actions";

export default function CardTech({
  images,
  id,
  name,
  price,
  brand,
  product,
  client,
}) {
  //const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favoriteProducts);
  const [favorite, setFavorite] = useState(false);
  console.log(favorite);
  console.log(favoriteProducts);
  // useEffect(() => {
  //   setIsFavorite(favoriteProducts.some((product) => product.id === id));
  // }, [favoriteProducts, id]);
  useEffect(() => {
    if (favoriteProducts.length !== 0) {
      const currentFavorite = favoriteProducts.filter(
        (favoriteProduct) => favoriteProduct.id === product.id
      );
      console.log(currentFavorite);
      setFavorite(currentFavorite);
    }
  }, [favoriteProducts, product]);

  const handleAddToFavorites = () => {
    if (!favorite) {
      dispatch(addToFavorites(product, 1));
    } else {
      // Si ya es favorito, eliminarlo de favoritos
      dispatch(removeFromFavorites(id));
    }
  };
  {
  }
  return (
    <Card sx={{ width: "100%", display: "grid", height: "300px" }}>
      <span
        role="button"
        onClick={handleAddToFavorites}
        style={{ cursor: "pointer" }}>
        {!favorite ? "★" : "☆"}
      </span>
      <Box sx={{ width: "100%", alignSelf: "flex-end" }}>
        <NavLink
          to={`/detail/${id}`}
          style={{ width: "100%", textDecoration: "none" }}>
          <CardMedia
            sx={{ width: "100%" }}
            component="img"
            image={images[0]}
            alt={name}
          />
          <CardContent>
            <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>

            <Typography variant="subtitle2" color="text.secondary">
              {price}
            </Typography>
          </CardContent>
        </NavLink>
      </Box>
    </Card>
  );
}
