const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AlertTech from "../alert/alert";
import axios from "axios";
import "./forgetPassword.css"

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);
  const [confirmationAlert, setConfirmationAlert] = useState(null);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const testToken = async () => {
      try {
        await axios(`${VITE_BACKEND_URL}/users/reset-password/${token}`);
        setValidToken(true);


      } catch (error) {
        showAlert("error", error.response.data.msg);
      }
    };
    testToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* SE RECOMIENDA USAR ESTA VALIDACION EN DESARROLLO PARA NO RENEGAR TANTO CON EL LOGEO  */

    // if (password.length < 6) {
    //   showAlert('error', 'Todos los campos son obligatorios');
    //   return;
    // }

    if (!/(?=.*[a-zA-Z])(?=.*\d).{7,}/.test(password)) {
      showAlert(
        "error",
        "La contraseña debe tener al menos 7 caracteres, incluir al menos una letra y al menos un número."
      );
      return;
    }
    try {
      const url = `${VITE_BACKEND_URL}/users/reset-password/${token}`;

      const { data } = await axios.post(url, { password });
      setPassword("");
      setPasswordModified(true);

      showAlert(
        "success",
        "Su password fue creado correctamente, ya puedes iniciar sesión"
      );
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response && error.response.data && error.response.data.error) {
        // Mostrar la alerta de error
        // showAlert('error', 'Ya hay un registro con este email');
        /* Se supone aqui deberia imprimir el mensaje de alerta del back */
        showAlert("error", error.response.data.error);
      }
    }
  };
  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
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
    <>
      <div className="">
        <h3 className="h1_ResetPassword">Cambia tu contraseña</h3>

        {confirmationAlert && (
          <AlertTech
            message={confirmationAlert.message}
            type={confirmationAlert.type}
          />
        )}

        <div className="columna">
          <NavLink to="/home">
            {/* <img src={imageLogo} alt="logo-home" className='logoRegister' />   */}
          </NavLink>
        </div>

        {validToken && (
          <form action="" className="form_ResetPassword" onSubmit={handleSubmit}>
            <div className="div_input_ResetPasswor">
              <div className="div_input_ResetPassword">
                <label className="label" htmlFor="password">
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input_ResetPassword"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div className="columna"></div>

            <input
              type="submit"
              value="Crear nuevo password"
              className="button_form_ResetPassword"
            />
          </form>
        )}

        {passwordModified && (
          <Link className="linksRegister" to="/home">
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NewPassword;
