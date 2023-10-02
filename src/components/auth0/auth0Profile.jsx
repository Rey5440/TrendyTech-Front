import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const userData = useSelector((state) => state.userData);
  // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const [accessToken, setAccessToken] = useState(null);
<<<<<<< HEAD
  useEffect(() => {
  
  }, [userData]);
=======
  useEffect(() => {}, [userData]);
>>>>>>> 1ce9a387a2049578ae4ac2ea6fc5dacce8965411

  return (
    <div>
      {userData.name ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>
            {userData.name}
          </p>
          <hr className="hr_login" />
          <img
            src={userData.image}
            alt="Perfil"
            style={{
              borderRadius: "50px",
              border: "3px solid #007bff",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfile;
