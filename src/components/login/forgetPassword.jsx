import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AlertTech from '../alert/alert';
import axios from 'axios'
import imageLogo from '../../assets/Trendy-Tech logo recortado.png'

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [confirmationAlert, setConfirmationAlert] = useState(null);
  
    const handleInputChange = (e, setState) => {
      // Eliminar espacios en blanco al principio y al final del valor
      const value = e.target.value.trim();
      setState(value);
    };
  
    const handleSubmit = async (e) => {
      console.log("hola");
      e.preventDefault();
  
      if ([email].includes("")) {
        showAlert('error', 'El campo email no puede ir vacío.');
        return;
      }
  
      try {
        const { data } = await axios.post( "http://localhost:3004/users/reset-password",{ email });

        showAlert('success', 'Se ha enviado un email a tu casilla de correo con los pasos a seguir para recuperar tu cuenta');
        setEmail('');
      } catch (error) {

        console.log(error.response.data.msg)
          showAlert('error', error.response.data.msg);
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
  
    // const { msg } = alert;
  
    return (
      <>
        <div className="mainRegister">
          <h3 className="titleLogin">
            Recupera el acceso a tu cuenta de Trendy-Spot
          </h3>
          {confirmationAlert && (
              <AlertTech message={confirmationAlert.message} type={confirmationAlert.type} />
            )}
  
          <form action="" className="formRegister" onSubmit={handleSubmit}>
            <div className="columna">
              <div className="divInput">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="input"
                  value={email}
                  onChange={(e) => handleInputChange(e, setEmail)}
                />
              </div>
                  <input
                  type="submit"
                  value="Enviar instrucciones"
                  className="btnCreateAccount"
                />
            </div>
  
            
        
                    <NavLink to="/">
                        <img src={imageLogo} alt="logo-home" className='logoRegister' />  
                    </NavLink>
             
  
            {/* <div className="columna">
            <img src={imageLogo} alt="logo-home" className="logoRegister" />
          </div> */}
  
    
          </form>
  
          <nav className="navRegister">
            <Link className="linksRegister" to="/login">
              ¿Tienes una cuenta? Inicia Sesión
            </Link>
            <Link className="linksRegister" to="/login/register">
              ¿No tienes una cuenta? Registrate
            </Link>
          </nav>
  
        </div>
      </>
    );
  };
  
  export default ForgetPassword;