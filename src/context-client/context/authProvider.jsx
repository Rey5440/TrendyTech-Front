import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import axiosClient from "../config/axiosClient";

const AuthContext = createContext()

/* AuthProvider rodea a toda la aplicacion */
const AuthProvider = ({children}) => {

    // const [auth, setAuth] = useState({})
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || '', // Inicializa con el token almacenado
      });
    const [cargando, setCargando] = useState(true)

    console.log(auth)
    console.log(cargando)

    const navigate = useNavigate()

/* Se ejecuta una sola vez , ya que solo comprueba que haya un token para autenticar al usuario */
    useEffect(() => {
        const authenticateUser = async () => {

            /* leer el token */
            const token = localStorage.getItem('token')
            console.log(token)

            //Si no hay token detenemos la ejecucion del codigo
            if(!token) {
                setCargando(false)
                return
            }

            /* headers es un objeto */
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {

                const {data} = await axios('http://localhost:3004/users/profile', config)
                // const {data} = await axiosClient('/users/profile', config)
                setAuth(data)
                console.log(data)
                navigate('/home')

            } catch (error) {
                setAuth({})
            } finally{
                 setCargando(false) 
            }

            
        }
        authenticateUser()
    }, [])


    const closeSession = () => {
        localStorage.removeItem('token')
        setAuth({})
    }


    return(
        <AuthContext.Provider

            value={{
                auth,
                setAuth, 
                cargando,
                closeSession
            }}
        >


            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;

