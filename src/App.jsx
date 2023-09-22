import { Routes, Route } from "react-router-dom";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Create from "./views/create/create";
import Presentation from "./views/presentation/presentation";
import Login from "./components/login/login";
import Register from "./components/login/register";
import ConfirmAccount from "./components/login/confirmAccount";
import ForgetPassword from "./components/login/forgetPassword";
import { AuthProvider } from "./context-client/context/authProvider";

function App() {
  return (
    <div>
      <AuthProvider>

          <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/register" element={<Register />} />
            <Route path="/confirm/:id" element={<ConfirmAccount />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
