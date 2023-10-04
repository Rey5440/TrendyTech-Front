import { useState, useEffect } from "react";
import axios from "axios";
import CardTech from "../card/card"; // Asegúrate de importar tu componente CardTech o ajustar el nombre de acuerdo a tu estructura.
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
//import FavoriteIcon from "@mui/icons-material/Favorite";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import Footer from "../../views/footer/footer";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(favorites);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = getUser(); // Implementa esta función para obtener la información del usuario autenticado

    if (!user) {
      // Si el usuario no está autenticado, muestra un mensaje
      setError(
        "No has iniciado sesión. Por favor, inicia sesión para ver tus favoritos."
      );
      setLoading(false);
    } else {
      // Si el usuario está autenticado, busca sus favoritos por ID
      fetchFavorites(user.id);
    }
  }, []);

  const getUser = () => {
    // Implementa la lógica para obtener la información del usuario autenticado,
    // por ejemplo, utilizando el contexto de autenticación o el estado global.
    // Devuelve null si el usuario no está autenticado o un objeto con la información del usuario si está autenticado.
    // Por ejemplo:
    // const user = useContext(AuthContext);
    // return user.isAuthenticated ? user : null;
    return 1; // Reemplaza esto con la lógica real para obtener el usuario.
  };

  const fetchFavorites = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3004/favorites/${1}`);
      const data = response.data.userFavorites;

      if (data.length === 0) {
        // Si el usuario no tiene favoritos, muestra un mensaje
        setError("No tienes productos favoritos seleccionados.");
      } else {
        // Si se encontraron favoritos, muestra los productos
        setFavorites(data);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al cargar tus favoritos.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant="h4" align="center" gutterBottom>
             Tus Productos Favoritos 
          </Typography>
        </Box>
        {loading ? (
          <Typography variant="h6" align="center">
            Cargando favoritos...
          </Typography>
        ) : favorites.length === 0 ? (
          <Typography variant="h6" align="center">
            No tienes productos favoritos seleccionados.
          </Typography>
        ) : (
          <Grid container spacing={8}>
            {favorites.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ height: "100%" }}>
                  <CardTech
                    id={product.id}
                    name={product.name}
                    images={product.images}
                    price={product.price}
                    brand={product.brand}
                    isFavorite
                  />
                  <CardContent>
                    {/* Aquí puedes agregar más detalles del producto si es necesario */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <hr />
      <Footer />
    </div>
  );
};

export default Favorites;
