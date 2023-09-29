import * as React from "react";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";

export default function CardTech({ images, id, name, price, brand }) {

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
            <h4>{name}</h4>
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
            <h2>${price}</h2>
          </Typography>
        </Box>
      </NavLink>
    </Card>
  );
}

/* import { NavLink } from "react-router-dom";
import './card.css'

const Card = ({ images, id, name, price, brand }) => {
    return (
        // el id va a servir para utilizar el NavLink que lleva al detail
        <NavLink to={`/detail/${id}`}>
        <div className="CardTech">
            <div className="ImgContainer">
            <img className="Img" src={image[0]} alt={name} width={"300px"} />
            </div>
            <h4 >{name}</h4>
            <h3 >{brand}</h3>
            <h2>$ {price}</h2>
        </div>
        </NavLink>
    )
}

export default Card; */
