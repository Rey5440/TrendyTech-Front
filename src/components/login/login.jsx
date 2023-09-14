import { useState } from 'react'
import {NavLink ,Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../context-client/hooks/useAuth'
import logo from '../../assets/Trendy-Tech logo recortado.png'
import './styles-login.css'

const Login = () => {
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
          //Informacion requerida: email y password
          const {data} = await axios.post('http://localhost:3004/users/login', {email, password})
          localStorage.setItem('token', data.token)
          setAuth(data)
          // navigate('/')
          navigate('/home')
    
        } catch (error) {
            console.log(error)
        }
      }


      return (
        <>
        <div className='mainRegister'>
            <h3 className="titleLogin">
              Inicia Sesión Y haz tus  compras
            </h3>
    
            <form 
                className="formLogin"
                onSubmit={handleSubmit}
                
                >
                <div className='columnaLogin'>
                <div className="divInput">
                    <label 
                      className="label"
                      htmlFor="email">
                          Email
                      </label>
                    
                      <input 
                          id="email"
                          type="email"
                          placeholder="Email de Registro"
                          className="inputLogin"
                          value={email}
                          onChange={ e=> setEmail(e.target.value)}
                      />
    
                </div>
    
                <div className="divInput">
                    <label 
                      className="label"
                      htmlFor="password">
                          Password
                      </label>
                    
                      <input 
                          id="password"
                          type="password"
                          placeholder="Password"
                          className="inputLogin"
                          value={password}
                          onChange={ e=> setPassword(e.target.value)}
                     />
    
    
                </div>
                </div>
    
                 <div className='columna'>
                      <NavLink to="/">
                          <img src={logo} alt="logo-home" className='logoRegister' />  
                      </NavLink>
                 </div> 
                
                
    
                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="btnLogin"    
                />
    
    
            </form>
    
            <nav className="navRegister">
                  <Link
                    className='linksRegister'
                    to="register"
                  >
                    ¿No tienes una cuenta? Registrate
                  </Link>
                  <Link
                    className='linksRegister'
                    // to="/reset-password"
                  >
                    Olvide mi Password
                  </Link>
            </nav>
            </div>
        </>
      )
}

export default Login