import SearchBar from "../searchBar/searchBar";
import { NavLink } from "react-router-dom";
import Trendy_Tech_Logo from "../../assets/Trendy-Tech logo recortado.png";
import "./nav.css";
//Material Icons es una librería de la cual podemos importar iconos para usarlos en nuestros componentes
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useState } from "react";
const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
               <NavLink to={'/home'}>
          <div className="Nav_LogoContainer">
            <img
              alt="Trendy Tech"
              src={Trendy_Tech_Logo}
              className="Nav_Logo"
            />
          </div>
          </NavLink>
          <SearchBar />
          <Box>
            <Box>
              <NavLink to="/ruta-Carrito" className="Nav_IconoCarrito">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </IconButton>
              </NavLink>
              <NavLink to="/ruta_Perfil" className="Nav_IconoPerfil">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircleIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
