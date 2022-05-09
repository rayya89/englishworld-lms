//NPM packages
import { BrowserRouter } from "react-router-dom";

//Project files
import UnloggedRoutes from "./routes/UnloggedRoutes";
import StudentsRoutes from "./routes/StudentsRoutes";
import TeachersRoutes from "./routes/TeachersRoutes";
import { useUser } from "./state/UserContext";
import "./styles/styles.css";

export default function App() {
  //Local state
  const { user } = useUser();

  return (
    <div className="App">
      <BrowserRouter>
        {user && user.role === "student" && <StudentsRoutes />}
        {user && user.role === "teacher" && <TeachersRoutes />}
        {!user && <UnloggedRoutes />}
      </BrowserRouter>
    </div>
  );
}
