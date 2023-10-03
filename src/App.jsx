import { Routes, Route } from "react-router-dom";
import PaymentStatus from "./components/paymentStatus/paymentStatus";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Create from "./views/create/create";
import Presentation from "./views/presentation/presentation";
import Register from "./components/login/register";
import ShoppingCart from "./components/shopping_cart/shopping_cart";
import ConfirmAccount from "./components/login/confirmAccount";
import ForgetPassword from "./components/login/forgetPassword";
import NewPassword from "./components/login/newPassword";
import { AuthProvider } from "./context-client/context/authProvider";
import UserForUser from "./views/userForUser/userForUser";
import Admin from "./views/admin/admin";
import Delete from "./views/delete/delete";
import ManageUsers from "./components/manageUsers/manageUsers";
//----------------------//
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import autenticateAllUsers from "./helpers/autenticateAllUsers";
import { getuserData, banUser } from "./redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from "./views/page_not_found/not_found";
import {getAllProducts} from "./redux/actions";
import Cookies from "js-cookie";
import ReviewAdmin from "./components/reviewAdmin/reviewAdmin";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllProducts())
  }, [])

  //-------------autenticate user with cookies------------------//
  const isBanned = useSelector((state) => state.setOpen);
  const [ignacioMagic, setIgnacioMagic] = useState({});
  const { user } = useAuth0();

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const result = await autenticateAllUsers(user);
          setIgnacioMagic(result);
          if (result.isDeleted) {
            dispatch(banUser(true));// borra las cookies automaticamente si está baneado
          } else {
            ignacioMagic && dispatch(getuserData(result));
            if (isBanned === true) dispatch(banUser(false));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [user]);
  //-----------------------------------------------------------//

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path="/confirm/:id" element={<ConfirmAccount />} />
          <Route path="/new-password/:token" element={<NewPassword />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/user" element={<UserForUser />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/reviewadmin" element={<ReviewAdmin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
