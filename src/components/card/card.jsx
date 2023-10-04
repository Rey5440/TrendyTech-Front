import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
 import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/actions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function CardTech({
  images,
  id,
  name,
  price,
  brand,
  product,
  client,
  isFavorite
}) {
   const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      dispatch(addToFavorites(product, 1));
    } else {
      dispatch(removeFromFavorites(product, 1));
    }
  };
  
  return (
    <Card sx={{ width: "100%", display: "grid", height: "300px" }}>
      <span
        role="button"
        onClick={handleAddToFavorites}
        style={{ cursor: "pointer" }}
      >
        
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </span>
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
