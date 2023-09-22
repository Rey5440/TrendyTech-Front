import * as React from "react";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoginButton from "../auth0/auth0Login";
import UserProfile from "../auth0/auth0Profile";

//----import del login del facha------//
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../context-client/hooks/useAuth";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   borderRadius: "15px",
//   boxShadow: 24,
//   p: 4,
// };

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //--------del login del facha---------//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [confirmationAlert, setConfirmationAlert] = useState(null);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Informacion requerida: email y password
      const { data } = await axios.post("http://localhost:3004/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      // navigate('/')
      navigate("/home");
    } catch (error) {
      // console.log(error);
      console.log(error.response.data.msg);
      showAlert("error", error.response.data.msg);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          color: "#fe7622",
          backgroundColor: "#ffffff",
        }}
        onClick={handleClickOpen}
      >
        <AccountCircleIcon sx={{ fontSize: 30 }} />
        Iniciar sesión
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Inicia sesión en Trendy Tech"}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form className="formLogin" style={{ display:"flex",flexDirection:"column" }}>
            <div className="columnaLogin">
              <div className="divInput">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="inputLogin"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="divInput">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="inputLogin"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="columna"></div>
            <input type="submit" value="Iniciar Sesión" className="btnLogin" />
          </form>
          <DialogTitle id="alert-dialog-title">{"Inicia con google"}</DialogTitle>
          <LoginButton />
          <UserProfile />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
