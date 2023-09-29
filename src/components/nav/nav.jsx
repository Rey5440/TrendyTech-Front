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
import ArchiveIcon from "@mui/icons-material/Archive";
import LoginModal from "../login/loginModal";
import autenticateAllUsers from "../../helpers/autenticateAllUsers";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../context-client/hooks/useAuth";
import axios from "axios";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "./nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [admin, setAdmin] = useState(false);
  const menuId = "primary-search-account-menu";
  const location = useLocation();
  const cart = useSelector((state) => state.shoppingCart);
  let totalProductsInCart = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const { user } = useAuth0();
  const { auth } = useAuth();
  useEffect(() => {
    if (user && user.email) {
      const result = autenticateAllUsers(user);
    }
  }, [user]);

  const handleProductsButton = (event) => {
    // dispatch(getAllProducts());
    navigate("/home");
  };

  //para hacer el rrenderizado condicional de la nav secundaria//
  const shouldShowNav = location.pathname === "/";
  //-------------------------//
  const pathsWithNavAdmin = ["/admin", "/home", "/create", "/manageUsers", "/user", "/shopping-cart"];
  const showNavAdmin = pathsWithNavAdmin.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleMoveToFooter = (event) => {
    window.scrollTo(0, 1000); // Scroll down
  };

  useEffect(() => {
    async function findAdmin() {
      const { id } = auth;
      const { data } = await axios.get(`${VITE_BACKEND_URL}/users/${id}`);
      if (data && data.isAdmin === true) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
    findAdmin();
  }, [auth, admin]);

  // const searchAdmin = async () => {
  // };

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
          <NavLink to={"/"}>
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {admin && showNavAdmin ? (
            <div className="button_presentation">
              <NavLink to={"/manageUsers"}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AccountCircleIcon />}
                  style={{ borderRadius: "50px", margin: "4px" }}
                >
                  Users
                </Button>
              </NavLink>
              <NavLink to="/create">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "50px",
                    margin: "4px",
                  }}
                  endIcon={<ArchiveIcon />}
                >
                  Crear
                </Button>
              </NavLink>

              <NavLink to={"/admin"}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AutoFixHighIcon />}
                  style={{ borderRadius: "50px", margin: "4px" }}
                >
                  Editar
                </Button>
              </NavLink>

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
          ) : shouldShowNav ? (
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
