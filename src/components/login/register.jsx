import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Trendy-Tech logo recortado.png'
import axios from 'axios'
import './styles-login.css'
import Nav from '../nav/nav';
import AlertTech from '../alert/alert';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [confirmationAlert, setConfirmationAlert] = useState(null);

const handleSubmit = async (e) => {
        e.preventDefault();

    if ([name, email, password, repetirPassword].includes('')) {
      showAlert('error', 'Todos los campos son obligatorios');
          return;
    }

        
    if (password !== repetirPassword) {
      showAlert('error', 'Los passwords no coinciden amigo(a)');
      return;
    }

    /* SE RECOMIENDA USAR ESTA VALIDACION EN DESARROLLO PARA NO RENEGAR TANTO CON EL LOGEO  */

    // if (password.length < 6) {
    //   showAlert('error', 'Todos los campos son obligatorios');
    //   return;
    // }

    if (!/(?=.*[a-zA-Z])(?=.*\d).{7,}/.test(password)) {
      showAlert('error', 'La contraseña debe tener al menos 7 caracteres, incluir al menos una letra y al menos un número.');
      return;
    }

    try {
        const { data } = await axios.post(`http://localhost:3004/users`, { name, email, password });
        console.log('pase por aca')

        setName('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');

        // alerta de confirmación
        showAlert('success', 'Se ha enviado un email a tu casilla de correo para que confirmes tu cuenta');

    } catch (error) {
        console.log(error.response.data.error)
        if (error.response && error.response.data && error.response.data.error) {
          // Mostrar la alerta de error
          // showAlert('error', 'Ya hay un registro con este email');
          /* Se supone aqui deberia imprimir el mensaje de alerta del back */
          showAlert('error', error.response.data.error);
        }
        }
    }

    
  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 3000);
  };

    const handleInputChange = (e, setState) => {
        // Eliminar espacios en blanco al principio y al final del valor
        const value = e.target.value.trim();
        setState(value);
      };


      return (
        <>
          <Nav/>
          <div className="mainRegister">
            <h3 className="titleLogin">Crea una cuenta para hacer tu compra</h3>

            {confirmationAlert && (
              <AlertTech message={confirmationAlert.message} type={confirmationAlert.type} />
            )}
    
            <form action="" className="formRegister" onSubmit={handleSubmit}>
              <div className="columna">
                <div className="divInput">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu name"
                    className="input"
                    value={name}
                    onChange={(e) => handleInputChange(e, setName)}
                  />
                </div>
    
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
    
                <div className="divInput">
                  <label className="label" htmlFor="password">
                    Password
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
    
                <div className="divInput">
                  <label className="label" htmlFor="password">
                    Repetir Password
                  </label>
                  <input
                    id="password2"
                    type="password"
                    placeholder="Repetir tu Password"
                    className="input"
                    value={repetirPassword}
                    onChange={(e) => handleInputChange(e, setRepetirPassword)}
                  />
                </div>
              </div>
    
              <NavLink to="/">
                <img src={logo} alt="logo-home" className='logoRegister' />  
              </NavLink>
    
              <input type="submit" value="Crear Cuenta" className="btnCreateAccount" />
            </form>
    
            <nav className="navRegister">
              <Link className="linksRegister" to="/login">
                ¿Tienes una cuenta? Inicia Sesión
              </Link>
              <Link className="linksRegister" to="/reset-password">
                Olvidé Mi Password
              </Link>
            </nav>
          </div>
        </>
      );

}

export default Register