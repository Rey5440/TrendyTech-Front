import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserProfile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
const [accessToken, setAccessToken] = useState(null);

  
  useEffect(() => {
    if (isAuthenticated) {
      obtenerToken();
    } else {
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={user?.picture}
              alt="Perfil"
              style={{ borderRadius: "50px", border: "3px solid #007bff" }}
            />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {user?.name}
          </p>
        </div>
      ) : (
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          No has iniciado sesión.
        </p>
      )}
    </div>
  );
};
// const postUser = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3004/users/auth",
//       user
//     );
//     const { data } = response;
//     // setUserResponse(data);
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

export default UserProfile;
