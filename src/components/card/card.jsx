import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { NavLink } from "react-router-dom";


export default function CardTech({ images, id, name, price, brand }) {
  return (
    /*  <Card sx={{ maxWidth: 330 }}>
   <div> */
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <NavLink to={`/detail/${id}`}>
          <CardMedia
            sx={{width: '300px'}}
            component="img"
            image={images[0]}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
            <h4>{name}</h4>
            </Typography>

            <Typography variant="h8" color="text.secondary">
            <h3>{brand}</h3>
            <h2>$ {price}</h2>
            </Typography>
          </CardContent>
        </NavLink>
      </CardActionArea>
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
