import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userResponse, setUserResponse] = useState({});

  

  const postUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3004/users/auth",
        user
      );
      const { data } = response;
      setUserResponse(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setUserData(user);
      obtenerToken();
      postUser();
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

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>
            Imagen de Perfil: <img src={userData?.picture} alt="Perfil" />
          </p>
          <p>Nombre: {userData?.name}</p>
          <p>Email: {userData?.email}</p>
          {/* <h2>Datos del Usuario</h2> */}
          {/* <p>Token de Acceso: {accessToken}</p> */}
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
};

export default UserProfile;
