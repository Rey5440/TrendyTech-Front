import Cookies from "js-cookie";

// Función para guardar los datos del usuario en una cookie
const saveUserDataToCookie = (user, isGoogleUser) => {
  const userKey = `user_${user.sub}`;
  const userData = JSON.stringify({ user, isGoogleUser });
  try {
    Cookies.set(userKey, userData, { expires: 1 });
    console.log("Datos de usuario guardados en la cookie");
  } catch (error) {
    console.log("Error al guardar datos de usuario en la cookie:", error);
  }
};

// Función para obtener los datos del usuario desde la cookie
const getUserDataFromCookie = (user, isAuthenticated) => {
  const userKey = `user_${user.sub}`;
  try {
    const userDataJSON = Cookies.get(userKey);
    if (userDataJSON) {
      const { user, isGoogleUser } = JSON.parse(userDataJSON);
      return { user, isGoogleUser };
    } else if (isAuthenticated) {
      const isGoogleUser =
        user.sub.includes(
          "google-oauth2"
        ); /* Lógica para determinar si es un usuario de Google */
      saveUserDataToCookie(user, isGoogleUser);
    }
  } catch (error) {
    console.log("Error al recuperar datos de usuario de la cookie:", error);
  }
  return null;
};

export { getUserDataFromCookie, saveUserDataToCookie };
