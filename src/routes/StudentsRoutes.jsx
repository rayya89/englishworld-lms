//NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";

export default function StudentsRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
      <Route path="login" element={<Login uidState={uidState} />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="dashboard" element={<Dashboard uidState={uidState} />} />
    </Routes>
  );
}
