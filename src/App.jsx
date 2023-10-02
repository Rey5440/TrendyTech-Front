import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import DeleteUser from "./components/deleteUser/deleteUser";
import DeleteProduct from "./components/deleteProduct/deleteProduct";
import ManageUsers from "./components/manageUsers/manageUsers";
import { useAuth0 } from "@auth0/auth0-react";
import autenticateAllUsers from "./helpers/autenticateAllUsers";
import { useDispatch } from "react-redux";
import { getuserData, banUser } from "./redux/actions";
import NotFound from "./views/page_not_found/not_found";
import {getAllProducts} from "./redux/actions";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllProducts())
  }, [])

  //-------------autenticate user with cookies-------------------//
  const { user } = useAuth0();
  const [ignacioMagic, setIgnacioMagic] = useState({})


  const { user } = useAuth0();
  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const result = await autenticateAllUsers(user);
          setIgnacioMagic(result)
          if (result.isDeleted) {
            dispatch(banUser(true));
          } else {
           ignacioMagic && dispatch(getuserData(result));
            dispatch(banUser(false));
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
          <Route path="/paymentStatus" element={<PaymentStatus />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/deleteuser" element={<DeleteUser />} />
          <Route path="/deleteproduct" element={<DeleteProduct />} />
          <Route path="/manageUsers" element={<ManageUsers />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
