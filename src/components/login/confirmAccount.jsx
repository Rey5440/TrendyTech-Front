import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from 'axios'
import AlertTech from '../alert/alert';
import './styles-login.css'

const ConfirmAccount = () => {
    // const [alert, setAlert] = useState({});
    const [accountConfirmated, setAccountConfirmated] = useState(false);
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  
    const params = useParams();
    const { id } = params; //desestructuramos extrayendo id de params
  
    useEffect(() => {
      const ConfirmAccount = async () => {
        try {
          const url = `http://localhost:3004/users/confirm/${id}`
          // const {data} = await clienteAxios(url)
          const {data} = await axios.post(url)
  
          console.log(data);

          setShowConfirmationAlert(true);
        //   setAlert({
        //     msg: data.msg,
        //     error: false,
        //   });
          setAccountConfirmated(true);
        } catch (error) {
        //   setAlert({
        //     msg: error.response.data.error,
        //     error: true,
        //   });
        }
      };
      ConfirmAccount();
    }, []);
  
    // const { msg } = alert;
  
    return (
      <>
        <div>Confirm Account</div>
  
        <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
          {/* {msg && <Alert alerta={alert} />} */}

          {showConfirmationAlert && ( // Mostrar la alerta de confirmación si showConfirmationAlert es true
                    <AlertTech message="Se ha enviado un email a tu casilla de correo para que confirmes tu cuenta" type="success" />
            )}
  
          <div className='columna'>
                    <NavLink to="/">
                        {/* <img src={imageLogo} alt="logo-home" className='logoRegister' />   */}
                    </NavLink>
               </div> 
  
          {accountConfirmated && (
            <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/login"
            >
              Log In
            </Link>
          )}
        </div>
      </>
    );
  };
  
  export default ConfirmAccount;