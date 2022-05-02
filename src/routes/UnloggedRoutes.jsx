// NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import NotLogged from "../pages/NotLogged";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";

export default function UnloggedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="*" element={<NotLogged />} />
    </Routes>
  );
}
