import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from 'axios'
import AlertTech from '../alert/alert';
import imageLogo from '../../assets/Trendy-Tech logo recortado.png'
import './styles-login.css'

const ConfirmAccount = () => {
    // const [alert, setAlert] = useState({});
    const [accountConfirmated, setAccountConfirmated] = useState(false);
    const [confirmationAlert, setConfirmationAlert] = useState(null);
  
    const params = useParams();
    const { id } = params; //desestructuramos extrayendo id de params
  
    useEffect(() => {
      const ConfirmAccount = async () => {
        try {
          const url = `http://localhost:3004/users/confirm/${id}`
          // const {data} = await clienteAxios(url)
          const {data} = await axios.post(url)
  
          console.log(data);

          setAccountConfirmated(true);

         showAlert('success', 'Tu cuenta ha sido confirmada, ya puedes iniciar sesión');
        } catch (error) {
          showAlert('error', 'Token no válido');
        }
      };
      ConfirmAccount();
    }, []);


    const showAlert = (type, message) => {
      // Mostrar la alerta
      setConfirmationAlert({ type, message });
  
      // Limpiar la alerta después de 3 segundos (3000 ms)
      setTimeout(() => {
        setConfirmationAlert(null);
      }, 3000);
    };
  
    // const { msg } = alert;
  
    return (
      <>
  
        <div className="mainConfirm">

        {confirmationAlert && (
              <AlertTech message={confirmationAlert.message} type={confirmationAlert.type} />
        )}
  
          <div className='columnaLogin'>
                    <NavLink to="/">
                        <img src={imageLogo} alt="logo-home" className='logoRegister' />  
                    </NavLink>
               </div> 
  
          {accountConfirmated && (
            <NavLink to='/login'>       
                <button className="inputLogin">
                              Log In
                </button>
            </NavLink>

          )}
        </div>
      </>
    );
  };
  
  export default ConfirmAccount;