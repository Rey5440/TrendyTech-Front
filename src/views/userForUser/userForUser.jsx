const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useAuth from "../../context-client/hooks/useAuth";
import axios from "axios";
import "./userForUser.css";
import { Edit as EditIcon } from "@mui/icons-material";
import Nav from "../../components/nav/nav";
import Footer from "../footer/footer";
import FormDialog from "../../components/openForm/openForm";

import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { getuserData, setAlert } from "../../redux/actions";
import Purchases from "../../components/purchases/purchases";

const UserForUser = () => {
  const { auth } = useAuth();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState({}); //-------si algo tira error probar con null--------
  const [showEdit, setShowEdit] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      let emailToSend;
      if (auth && auth.email) {
        emailToSend = auth.email;
      } else if (user && user.email) {
        emailToSend = user.email;
      }

      if (emailToSend) {
        try {
          const result = await axios.get(
            `${VITE_BACKEND_URL}/users/email/${emailToSend}`
          );
          setUserData(result.data);
        } catch (error) {
          console.error("Error al obtener datos del usuario", error);
        }
      }
    };

    fetchData();
  }, [auth, user, userUpdated, imageUpdated]);

  /*     const handleEditImage = () => {
            console.log('cambiar imagen')
        } */
  const handleEditName = () => {
    setShowEdit(true);
  };
  const onClose = () => {
    setShowEdit(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "trendyImg");

      try {
        // Primer solicitud: Subir imagen a Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dntrwijx5/image/upload",
          { method: "POST", body: data }
        );
        const res = await response.json();

        if (res.secure_url) {
          const emailToSend =
            auth && auth.email
              ? auth.email
              : user && user.email
              ? user.email
              : null;

          if (emailToSend) {
            try {
              // Segunda solicitud: Enviar la URL de la imagen a tu backend junto con el email
              const backendResponse = await axios.put(
                `${VITE_BACKEND_URL}/users/editimage`,
                {
                  email: emailToSend,
                  newImage: res.secure_url,
                }
              );
              console.log(backendResponse);
              setImageUpdated(!imageUpdated);
              dispatch(setAlert("La imagen se cambio con exito", "success"));
              //---------actualizar imagen en el modal-----------//
              dispatch(getuserData(backendResponse.data));
              // Manejar la respuesta de tu backend si es necesario
              console.log(backendResponse.data);
            } catch (backendError) {
              console.error("Error sending data to backend:", backendError);
            }
          } else {
            console.error("No email available for sending to backend");
          }
        } else {
          console.error("Failed to upload image to Cloudinary");
        }
      } catch (cloudinaryError) {
        console.error("Error uploading to Cloudinary:", cloudinaryError);
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="userContainer">
          <h2>Edita tu perfil</h2>
          <div className="imageContainer">
            <img
              src={
                userData.image ||
                "https://res.cloudinary.com/dntrwijx5/image/upload/v1695410025/imagenes/emnvfsjtizz9luh9ohpx.jpg"
              }
              alt={userData.name}
              className="userImage"
            />
            <div className="editIconOverlay">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-input"
                onChange={handleFileChange}
              />
              <Tooltip title="Presiona y selecciona una nueva imagen!" arrow>
                <label htmlFor="image-input">
                  <EditIcon fontSize="small" color="primary" />
                </label>
              </Tooltip>
            </div>
          </div>
          <div className="userName">
            <h2>{userData.name}</h2>
            <Tooltip title="Presiona para cambiar el nombre!" arrow>
              <EditIcon
                fontSize="small"
                color="primary"
                onClick={handleEditName}
              />
            </Tooltip>
          </div>
          <h3>{userData.email}</h3>
          {/* ACA VA LA LISTA DE PRODUCTOS COMPRADOS */}
        </div>
        <FormDialog
          onClose={onClose}
          showEdit={showEdit}
          userData={userData}
          onUserUpdate={() => setUserUpdated(!userUpdated)}
        />
        <Purchases/>
        <Footer />
      </div>
    </div>
  );
};

export default UserForUser;
