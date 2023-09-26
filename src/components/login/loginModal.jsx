const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import * as React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoginButton from "../auth0/auth0Login";
import UserProfile from "../auth0/auth0Profile";
import { useAuth0 } from "@auth0/auth0-react";
import "./loginModal.css";

//----import del login del facha------//
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../context-client/hooks/useAuth";
import AlertTech from "../alert/alert";

const LoginModal = () => {
  const { isAuthenticated } = useAuth0();

  const [open, setOpen] = React.useState(false);
  // const location = useLocation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //--------del login del facha---------//
  const [commonUser, setCommonUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationAlert, setConfirmationAlert] = useState(null);
  const { auth, closeSession } = useAuth();
  const { setAuth } = useAuth();

  // console.log(auth);
  // console.log(closeSession);
  // console.log(isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    const getCommonUser = async () => {
      if (auth.email) {
        try {
          const response = await axios.post(
            `${VITE_BACKEND_URL}/users/emailuser`,
            { email: auth.email }
          );
          setCommonUser(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    getCommonUser();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Informacion requerida: email y password
      const { data } = await axios.post(`${VITE_BACKEND_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/home");
      // setOpen(false) hay que ver cuando el usuario no esta loggeado
    } catch (error) {
      console.log(error.response.data.msg);
      showAlert("error", error.response.data.msg);
    }
  };

  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 3000);
  };

  return (
    <div>
      {confirmationAlert && (
        <AlertTech
          message={confirmationAlert.message}
          type={confirmationAlert.type}
        />
      )}
      <IconButton
        variant="contained"
        sx={{
          color: "#ffffff",
        }}
        onClick={handleClickOpen}
      >
        <AccountCircleIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Dialog
        className="hola"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!auth.email && !isAuthenticated && (
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
            }}
          >
            {"Inicia sesión en TrendyTech"}
          </DialogTitle>
        )}
        {auth.email && (
          <div>
            <h2 className="h2_common_user">{auth.name}</h2>
            <hr className="hr_login" />
            <img
              className="img_common_user"
              src={
                commonUser.image ||
                "https://img.panamericana.pe/noticia/2014/09/640-1410205121176.jpg.webp"
              }
              alt="mi foto"
            />
          </div>
        )}
        {/* ----------------- */}
        <DialogContent
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {(auth.email && !isAuthenticated) ||
          (!auth.email && isAuthenticated) ? null : (
            <div className="divContainer_Form_Login">
              <form className="form_Login" onSubmit={handleSubmit}>
                <div className="divContainer_input_login">
                  <div className="div_input_login">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email de Registro"
                      className="input_Login"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="div_input_login">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="input_Login"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Iniciar"
                  className="button_form_login"
                />
                <div className="nav_Register_login">
                  <NavLink className="links_Register_and_reset" to="/register">
                    ¿No tienes una cuenta? Registrate
                  </NavLink>
                  <NavLink
                    className="links_Register_and_reset"
                    to="/reset-password"
                  >
                    Olvide mi Password
                  </NavLink>
                </div>
              </form>
            </div>
          )}
          {/* --------------- */}
          {(auth.email && !isAuthenticated) ||
          (!auth.email && isAuthenticated) ? null : (
            <DialogTitle
              id="alert-dialog-title"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
              }}
            >
              {"Inicia con google"}
            </DialogTitle>
          )}
          {/* ----------------- */}
          <UserProfile />
          {isAuthenticated || auth.email ? (
            <NavLink to="/mi-perfil">
              {/* ver que ruta es la del perfil */}
              <NavLink to="/user">
                <Button variant="contained">mi perfil</Button>
              </NavLink>
            </NavLink>
          ) : null}
          {/* ------------- */}
          {auth.email && (
            <Button sx={{ marginTop: "10px" }} onClick={closeSession}>
              cerrar sesión
            </Button>
          )}
          {/* ------------- */}
          {!auth.email && <LoginButton />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
