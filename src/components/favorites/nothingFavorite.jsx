import { Box } from "@mui/system";
//import TrendyTech from "../../assets/Trendy-Tech logo recortado.png";

export default function Nothing() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        backgroundColor: "white",
        width: "400%",
        height: "300px",
        borderRadius: "5px",
        boxShadow: "0px 0px 3px 0.01px rgba(0, 0, 0, 0.14)",
      }}>
      {/* <img src={TrendyTech} alt="carrito vacio" className="empty-cart-icon" /> */}
      <h4>Lo siento! No tienes productos Favoritos.</h4>
    </Box>
  );
}
