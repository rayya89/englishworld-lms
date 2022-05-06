//NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import CourseContent from "../pages/CourseContent";
import RecoverPassword from "../pages/RecoverPassword";

export default function StudentsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/course/:courseId" element={<CourseContent />} />
    </Routes>
  );
}
