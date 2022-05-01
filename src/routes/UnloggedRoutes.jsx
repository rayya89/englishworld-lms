// NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import NotLogged from "../pages/NotLogged";
import Login from "../pages/Login";

export default function UnloggedRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
      <Route path="login" element={<Login uidState={uidState} />} />
      <Route path="*" element={<NotLogged />} />
    </Routes>
  );
}
