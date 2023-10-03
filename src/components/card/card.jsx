import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { toFormatPrice } from "../../helpers/toFormatPrice";

export default function CardTech({ images, id, name, price, brand }) {
  //------formateamos el precio con puntos y comas----/
  const formattedPrice = toFormatPrice(price);

  return (
    <Card
      sx={{
        height: "300px",
        padding: "4px",
        display: "flex",
        boxSizing: "content-box",
      }}
    >
      <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <Box sx={{ height: "50%", width: "100%" }}>
          <CardMedia
            sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
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

          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#007bff",
              borderRadius: "4px",
              color: "white",
            }}
          >
            {formattedPrice}
          </Typography>
        </Box>
      </NavLink>
    </Card>
  );
}
