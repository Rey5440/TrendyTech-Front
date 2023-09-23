import { Container, Box } from "@mui/system";
import iconoCarrito from "../../assets/online-shopping (1).png";
export default function Empty() {
  return (
    <Container
      sx={{
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          backgroundColor: "white",
          width: "40%",
          height: "25rem",
          borderRadius: "5px",
          boxShadow: "0px 0px 3px 0.01px rgba(0, 0, 0, 0.14)",
        }}
      >
        <img
          src={iconoCarrito}
          alt="carrito vacio"
          className="empty-cart-icon"
        />
        <h2>¡Tu carrito está vacío!</h2>
        <NavLink to="/home" className="home-button">
          Ver productos
        </NavLink>
        <h4>Lo siento! No existen productos con esas características</h4>
      </Box>
    </Container>
  );
}
