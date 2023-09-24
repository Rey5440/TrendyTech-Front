import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";

export default function CardTech({ images, id, name, price, brand }) {
  return (
    /*  <Card sx={{ maxWidth: 330 }}>
   <div> */
    <Card sx={{ width: "100%", display: "grid", height: "500px", }}>
      <Box sx={{ width: "100%", alignSelf: "flex-end" }}>
        <NavLink
          to={`/detail/${id}`}
          style={{ width: "100%", textDecoration: "none" }}
        >
          <CardMedia
            sx={{ width: "100%" }}
            component="img"
            image={images[0]}
            alt={name}
          />
          <CardContent>
            <Typography sx={{fontWeight: 'bold',}}>
              <h4>{name}</h4>
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
            <h2>${price}</h2>
            </Typography>
          </CardContent>
        </NavLink>
      </Box>
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
