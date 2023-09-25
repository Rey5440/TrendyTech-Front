import { Routes, Route } from "react-router-dom";
import PaymentStatus from './components/paymentStatus/paymentStatus';
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Create from "./views/create/create";
import Presentation from "./views/presentation/presentation";
// import Login from "./components/login/login";
import Register from "./components/login/register";
import ShoppingCart from "./components/shopping_cart/shopping_cart";
import ConfirmAccount from "./components/login/confirmAccount";
import ForgetPassword from "./components/login/forgetPassword";
import NewPassword from "./components/login/newPassword";
import { AuthProvider } from "./context-client/context/authProvider";
import UserForUser from "./views/userForUser/userForUser";

function App() {
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
          <Route path="/new-password/:id" element={<NewPassword />} />
          <Route path="/confirm/:id" element={<ConfirmAccount />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/user" element={<UserForUser />} />
            <Route path="/paymentStatus" element={< PaymentStatus />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
