import Cookies from "js-cookie";
import axios from "axios";
import generateToken from "./generateToken";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const getToken = (user) => {
  const token = generateToken();
  user.token = token;
  return user;
};

const saveUserDataToCookie = async (user) => {
  // Genera una clave única para cada usuario (por ejemplo, el ID de usuario)
  // Convierte el objeto userData a una cadena JSON
  const userData = JSON.stringify(user);
  console.log(userData, "esto es lo que guardamos en las cookies");
  try {
    // Guarda los datos en una cookie llamada "userData"
    const guardar = Cookies.set("ignacioMagic", userData, { expires: 1 });
    const result = await getUserDataFromCookie(guardar);
    return result;
    // console.log("Usuario creado"); // Puedes ajustar la duración de la cookie según tus necesidades
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (userToken) => {
  try {
<<<<<<< HEAD
    const response = await axios.get(`${VITE_BACKEND_URL}/users/token/${user}`);
=======
    const response = await axios.get(
      `http://localhost:3004/users/token/${userToken}`
    );
>>>>>>> 1ce9a387a2049578ae4ac2ea6fc5dacce8965411
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (user) => {
  try {
<<<<<<< HEAD
    const response = await axios.post(`${VITE_BACKEND_URL}/users/auth`, user);
    saveUserDataToCookie(user.token);
=======
    const response = await axios.post("http://localhost:3004/users/auth", user);
    const result = await saveUserDataToCookie(response.data.user.token);
    return result;
>>>>>>> 1ce9a387a2049578ae4ac2ea6fc5dacce8965411
  } catch (error) {
    console.log(error);
  }
};

// Función para obtener los datos del usuario desde la cookie
const getUserDataFromCookie = async (user) => {
  // Genera la clave única para el usuario
  try {
    // Obtiene la cadena JSON de la cookie "userKey"
    const userDataJSON = Cookies.get("ignacioMagic");
    // Si la cookie existe, la parsea de JSON a un objeto
    if (userDataJSON) {
      const userToken = JSON.parse(userDataJSON);
      const userData = await getUser(userToken);
      return userData;
    } else if (user.email) {
      const userWithToken = getToken(user);
      const result = await postUser(userWithToken);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
  // Si la cookie no existe o está vacía, retorna null o un valor predeterminado según tu lógica
  return null;
};

const autenticateAllUsers = async (user) => {
  const result = await getUserDataFromCookie(user);
  // Función para guardar datos del usuario en una cookie
  return result;
};

export default autenticateAllUsers;
