//NPM packages
import { Routes, Route } from "react-router-dom";

//Project files
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ListCourses from "../pages/ListCourses";
import RecoverPassword from "../pages/RecoverPassword";
import EditCourse from "../pages/EditCourse";
import CourseParticipants from "../pages/CourseParticipants";

export default function TeachersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="list-courses" element={<ListCourses />} />
      <Route
        path="list-courses/edit-course/:courseId"
        element={<EditCourse />}
      />
      <Route
        path="list-courses/participants/:courseId"
        element={<CourseParticipants />}
      />
    </Routes>
  );
}
