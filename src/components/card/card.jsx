import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { NavLink } from "react-router-dom";
import './card.css'

export default function CardTech({ image, id, name, price, brand }) {
  return (
   /*  <Card sx={{ maxWidth: 330 }}>
   <div> */
   <CardActionArea>
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
        </CardActionArea>
      /*   </div>
    </Card> */
  );
}

/* import { NavLink } from "react-router-dom";
import './card.css'

const Card = ({ image, id, name, price, brand }) => {

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