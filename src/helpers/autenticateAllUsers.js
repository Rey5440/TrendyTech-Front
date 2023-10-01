import Cookies from "js-cookie";
import axios from "axios";
import generateToken from "./generateToken";

const getToken = (user) => {
  const token = generateToken();
  user.token = token;
  return user;
};

const saveUserDataToCookie = (user) => {
  // Genera una clave única para cada usuario (por ejemplo, el ID de usuario)
  // Convierte el objeto userData a una cadena JSON
  const userData = JSON.stringify(user);
  try {
    // Guarda los datos en una cookie llamada "userData"
    Cookies.set("ignacioMagic", userData, { expires: 1 });
    // console.log("Usuario creado"); // Puedes ajustar la duración de la cookie según tus necesidades
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (user) => {
  try {
    const response = await axios.get(`http://localhost:3004/users/token/${user}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (user) => {
  try {
    const response = await axios.post("http://localhost:3004/users/auth", user);
    saveUserDataToCookie(user.token);
  } catch (error) {
    console.log(error);
  }
};

// Función para obtener los datos del usuario desde la cookie
const getUserDataFromCookie = async(user) => {
  // Genera la clave única para el usuario
  try {
    // Obtiene la cadena JSON de la cookie "userKey"
    const userDataJSON = Cookies.get("ignacioMagic");
    console.log(userDataJSON);
    // Si la cookie existe, la parsea de JSON a un objeto
    if (userDataJSON) {
      const user = JSON.parse(userDataJSON);
      const tal = await getUser(user)
      return tal;
    } else if (user.email) {
      const userWithToken = getToken(user);
      postUser(userWithToken);
    }
  } catch (error) {
    console.log(error);
  }
  // Si la cookie no existe o está vacía, retorna null o un valor predeterminado según tu lógica
  return null;
};

const autenticateAllUsers = (user) => {
 const result = getUserDataFromCookie(user);
  // Función para guardar datos del usuario en una cookie
  return result;
};

export default autenticateAllUsers;
