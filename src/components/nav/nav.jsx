import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import { Button, Box } from "@mui/material";
import SearchBar from "../searchBar/searchBar";
import Trendy_Tech_Logo from "../../assets/Trendy-Tech logo recortado.png";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SortIcon from "@mui/icons-material/Sort";
import LoginModal from "../login/loginModal";
import autenticateAllUsers from "../../helpers/autenticateAllUsers";
import { useAuth0 } from "@auth0/auth0-react";
import "./nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";
  const location = useLocation();
  const cart = useSelector((state) => state.shoppingCart);
  let totalProductsInCart = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  useEffect(() => {
    user && autenticateAllUsers(user, isAuthenticated);
  }, [user]);

  const handleProductsButton = (event) => {
    dispatch(getAllProducts());
    navigate("/home");
  };

  //para hacer el rrenderizado condicional de la nav secundaria//
  const pathsWithNavSecondary = [
    "/register",
    "/confirm",
    "/logged_in",
    "/dashboard",
    "/home",
    "/detail",
    "/create",
    "/shopping-cart",
    "/reset-password",
    "/user",
  ];
  const shouldShowNav = !pathsWithNavSecondary.some((path) =>
    location.pathname.startsWith(path)
  );
  //-------------------------//

  const handleMoveToFooter = (event) => {
    window.scrollTo(0, 1000); // Scroll down
  };

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
          <NavLink to={"/admin"}>
            <Button variant="contained" className="button_agregar">
              Admin
            </Button>
          </NavLink>
          <SearchBar />
          <Box>
            <Box>
              <NavLink to="/create">
                <Button variant="contained" className="button_agregar">
                  Crear
                </Button>
              </NavLink>
              <NavLink to="/shopping-cart" className="Nav_IconoCarrito">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  className="Nav_IconoCarrito"
                >
                  <Badge badgeContent={totalProductsInCart} color="error">
                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </IconButton>
              </NavLink>
            </Box>
          </Box>
          <LoginModal />
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
                  Productos
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
              <Button
                variant="contained"
                color="warning"
                style={{
                  borderRadius: "50px",
                  margin: "4px",
                }}
                endIcon={<PermContactCalendarIcon />}
                onClick={handleMoveToFooter}
              >
                Contactenos
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
