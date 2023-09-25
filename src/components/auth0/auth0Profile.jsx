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
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>{user?.name}</p>
          <hr className="hr_login" />
          <img
            src={user?.picture}
            alt="Perfil"
            style={{ borderRadius: "50px", border: "3px solid #007bff", marginTop:"10px", marginBottom:"10px" }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};


export default UserProfile;
