//NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ListCourses from "../pages/ListCourses";

export default function TeachersRoutes({ uidState }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp uidState={uidState} />} />
      <Route path="login" element={<Login uidState={uidState} />} />
      <Route path="list-courses" element={<ListCourses />} />
    </Routes>
  );
}
