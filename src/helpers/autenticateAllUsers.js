import Cookies from "js-cookie";
import axios from "axios";

const saveUserDataToCookie = (user) => {
  // Genera una clave única para cada usuario (por ejemplo, el ID de usuario)
  const userKey = `user_${user.sub}`;
  // Convierte el objeto userData a una cadena JSON
  const userData = JSON.stringify(user);
  try {
    // Guarda los datos en una cookie llamada "userData"
    Cookies.set(userKey, userData, { expires: 1 });
    console.log("hola calenius"); // Puedes ajustar la duración de la cookie según tus necesidades
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (user) => {
  try {
    const response = await axios.post("http://localhost:3004/users/auth", user);
    saveUserDataToCookie(user);
    console.log("pase por aca");
  } catch (error) {
    console.log(error);
  }
};

// Función para obtener los datos del usuario desde la cookie
const getUserDataFromCookie = (user, isAuthenticated) => {
  // Genera la clave única para el usuario
  const userKey = `user_${user.sub}`;
  try {
    // Obtiene la cadena JSON de la cookie "userData"
    const userDataJSON = Cookies.get(userKey);
    // Si la cookie existe, la parsea de JSON a un objeto
    if (userDataJSON) {
      return JSON.parse(userDataJSON);
    } else if (isAuthenticated) {
      postUser(user);
    }
  } catch (error) {
    console.log(error);
  }
  // Si la cookie no existe o está vacía, retorna null o un valor predeterminado según tu lógica
  return null;
};

const autenticateAllUsers = (user, isAuthenticated) => {
  console.log(user, isAuthenticated);

  getUserDataFromCookie(user, isAuthenticated);
  // Función para guardar datos del usuario en una cookie
};

export default autenticateAllUsers;
