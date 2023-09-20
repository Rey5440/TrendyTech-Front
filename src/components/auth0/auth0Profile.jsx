import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUserData(user); 
      obtenerToken();
      
    } else {
      setUserData(null);
      setAccessToken(null);
    }
  }, [isAuthenticated, user]);

  const obtenerToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token); 
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
    }
  };

  console.log(userData);
  console.log(accessToken);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Datos del Usuario</h2>
          <p>Nombre: {userData?.name}</p>
          <p>Email: {userData?.email}</p>
          <p>Imagen de Perfil: <img src={userData?.picture} alt="Perfil" /></p>
          <p>Token de Acceso: {accessToken}</p>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
};

export default UserProfile;
