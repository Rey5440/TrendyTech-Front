import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Trendy-Tech logo recortado.png'
import axios from 'axios'
import './styles-login.css'
import Nav from '../nav/nav';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const { data } = await axios.post(`http://localhost:3004/users`, { name, email, password });

        setName('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');
    } catch (error) {
        console.log(error)
        }
    }

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
    
            {/* {msg && <Alerta alerta={alerta} />} */}
    
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