import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import { Button } from "@mui/material";
import SearchBar from "../searchBar/searchBar";
import Trendy_Tech_Logo from "../../assets/Trendy-Tech logo recortado.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LoginModal from "../loginModal/loginModal";
import "./nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";
  const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProductsButton = (event) => {
    dispatch(getAllProducts())
    navigate("/home")
  }
  
  //para hacer el rrenderizado condicional de la nav secundaria//
  const pathsWithNavSecondary = [
    "/login",
    "/register",
    "/confirm",
    "/logged_in",
    "/dashboard",
    "/home",
    "/detail",
    "/create",
    "/ruta-Carrito",
  ];

  const shouldShowNav = !pathsWithNavSecondary.some((path) =>
    location.pathname.startsWith(path)
  );
//-------------------------//
  return (
    <Box>
      <AppBar position="static" color="warning">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink to={"/home"}>
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
              <LoginModal />
              <NavLink to="/create">
                <Button variant="contained" className="button_agregar">
                  Crear
                </Button>
              </NavLink>
              <NavLink to="/ruta-Carrito" className="Nav_IconoCarrito">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  className="Nav_IconoCarrito"
                >
                  <Badge badgeContent={17} color="error">
                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </IconButton>
              </NavLink>
              <NavLink to="/login" className="Nav_IconoPerfil">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  className="Nav_IconoPerfil"
                >
                  <AccountCircleIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <AppBar position="static" color="text">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {shouldShowNav ? (
            <div className="button_presentation">
              <NavLink to="/home">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px" }}
                  // className="button_ingresar"
                  endIcon={<RocketLaunchIcon />}
                >
                  Ingresar
                </Button>
              </NavLink>
            </div>
          ) : (
            <div className="button_presentation">
              <NavLink to="/home">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px", margin: "4px" }}
                  // className="button_ingresar"
                  endIcon={<RocketLaunchIcon />}
                  onClick={handleProductsButton}
                >
                  Products
                </Button>
              </NavLink>
              <NavLink to="">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px", margin: "4px" }}
                  // className="button_ingresar"
                  endIcon={<LocalOfferIcon />}
                >
                  Descuentos
                </Button>
              </NavLink>
              <NavLink to="">
                <Button
                  variant="contained"
                  color="warning"
                  style={{
                    borderRadius: "50px",
                    margin: "4px",
                  }}
                  // className="button_ingresar"
                  endIcon={<PermContactCalendarIcon />}
                >
                  Contactenos
                </Button>
              </NavLink>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
