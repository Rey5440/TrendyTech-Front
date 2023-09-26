const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AlertTech from "../alert/alert";
import axios from "axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  // const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const testToken = async () => {
      try {
        await axios(`${VITE_BACKEND_URL}/users/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setShowAlertError(true);
        //   setAlert({
        //     msg: error.response.data.msg,
        //     error: true,
        //   });
      }
    };
    testToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      // setAlert({
      //   msg: "El Password debe tener al menos 6 caracteres",
      //   error: true,
      // });
      return;
    }
    try {
      const url = `${VITE_BACKEND_URL}/users/reset-password/${token}`;

      const { data } = await axios.post(url, { password });
      // setAlert({
      //   msg: data.msg,
      //   error: false,
      // });
      setPassword("");
      setPasswordModified(true);
    } catch (error) {
      // setAlert({
      //   msg: error.response.data.msg,
      //   error: true,
      // });
    }
  };
  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  // const { msg } = alert;

  return (
    <>
      <div className="mainRegister">
        <h3 className="titleLogin">Cambia tu contraseña</h3>

        <div className="columna">
          <NavLink to="/home">
            {/* <img src={imageLogo} alt="logo-home" className='logoRegister' />   */}
          </NavLink>
        </div>

        {/* {msg && <Alert alerta={alert} />} */}

        {validToken && (
          <form action="" className="formRegister" onSubmit={handleSubmit}>
            <div className="columna">
              <div className="divInput">
                <label className="label" htmlFor="password">
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div className="columna"></div>

            <input
              type="submit"
              value="Crear nuevo password"
              className="btnCreateAccount"
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
