import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const UserForUser = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    console.log(user)
    console.log(getAccessTokenSilently())
    const [accessToken, setAccessToken] = useState(null)
    accessToken && console.log(accessToken)
    const obtenerToken = async () => {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error("Error al obtener el token de acceso:", error);
        }
      };

    useEffect(()=>{
        obtenerToken()
    },[])  
    
    return (
        <div>
            <img src='https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png'></img>
            <h1>name</h1>
            <h1>mail</h1>

        </div>
    )
}

export default UserForUser;

/* getAccessTokenSilently */
