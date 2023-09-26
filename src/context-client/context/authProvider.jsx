import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import axiosClient from "../config/axiosClient";
import {
  saveUserDataToCookie,
  getUserDataFromCookie,
} from "../../components/helpers/authUtils";
import Cookies from "js-cookie";

const AuthContext = createContext();

/* AuthProvider rodea a toda la aplicacion */
const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({})
  const [auth, setAuth] = useState({
    token: "", // Inicializa con el token almacenado
  });
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

    console.log(auth)
    console.log(cargando)

      //Si no hay token detenemos la ejecucion del codigo
      if (!token) {
        setCargando(false);
        return;
      }

      /* headers es un objeto */
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios(
          "http://localhost:3004/users/profile",
          config
        );
        // const {data} = await axiosClient('/users/profile', config)
        setAuth(data);
        console.log(data);
        navigate("/home");
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    authenticateUser();
  }, [navigate]);

  const closeSession = () => {
    Cookies.remove("auth"); // Cambia localStorage a Cookies
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        closeSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

                const {data} = await axios('http://localhost:3004/users/profile', config)
                // const {data} = await axiosClient('/users/profile', config)
                setAuth(data)
                /* dispatch(neptuno(data)) */
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
