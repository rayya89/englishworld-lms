// NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import NotLogged from "../pages/NotLogged";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";

export default function UnloggedRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
      <Route path="login" element={<Login uidState={uidState} />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="*" element={<NotLogged />} />
    </Routes>
  );
}
