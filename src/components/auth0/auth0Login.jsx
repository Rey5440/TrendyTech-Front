import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import chromeImgLogin from "../../assets/chrome.png";
import "./auth0Login.css";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <img
            src={chromeImgLogin}
            onClick={handleLogin}
            className="img_login_google"
          />
        </div>
      ) : (
        <Button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          style={{ marginTop: "15px" }}
        >
          Cerrar Sesión
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
