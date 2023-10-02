import React, { useState } from "react";
import CardTech from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import Footer from "../../views/footer/footer";
import Nothing from "./nothingFavorite";
import axios from "axios";

function FavoritesPage() {
  const favoriteProducts = useSelector((state) => state.favoriteProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  //agregar un producto a favoritos
  const addToFavorites = async (productId) => {
    try {
      setIsLoading(true);
      await axios.post(`http://localhost:3004/favorites/${productId}`, {
        productId,
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  //quitar un producto de favoritos
  const removeFromFavorites = async (productId) => {
    try {
      setIsLoading(true);
      await axios.delete("http://localhost:3004/favorites/id-favorite", {
        data: { productId },
      });
    } catch (error) {
      console.error("Error al quitar de favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Mis Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <Nothing />
      ) : (
        <div>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              width: "100%",
              margin: "1%",
              marginLeft: "6%",
              rowGap: 3,
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
            className="favorites-container">
            {favoriteProducts.map((product) => (
              <CardTech
                key={product.id}
                id={product.id}
                name={product.name}
                images={product.images}
                price={product.price}
                brand={product.brand}
              />
            ))}
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {favoriteProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => removeFromFavorites(product.id)}
                disabled={isLoading}>
                Quitar de favoritos
              </button>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
export default FavoritesPage;
