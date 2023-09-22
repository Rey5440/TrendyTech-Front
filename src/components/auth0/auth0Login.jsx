import { useAuth0 } from "@auth0/auth0-react";
import chromeImgLogin from "../../assets/chrome.png"
import { Button } from "@mui/material"; 

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
          <img src={chromeImgLogin} onClick={handleLogin} />
        </div>
      ) : (
        <Button onClick={() => logout()}>Cerrar Sesión</Button>
      )}
    </div>
  );
};

export default LoginButton;
