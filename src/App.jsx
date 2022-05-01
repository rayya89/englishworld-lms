//NPM packages
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

//Project files
import UnloggedRoutes from "./routes/UnloggedRoutes";
import StudentsRoutes from "./routes/StudentsRoutes";
import TeachersRoutes from "./routes/TeachersRoutes";

export default function App() {
  //Local state
  const [uid, setUid] = useState(null);
  //const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        {uid && uid.role === "student" && (
          <StudentsRoutes uidState={[uid, setUid]} />
        )}
        {uid && uid.role === "teacher" && (
          <TeachersRoutes uidState={[uid, setUid]} />
        )}
        {!uid && <UnloggedRoutes uidState={[uid, setUid]} />}
      </BrowserRouter>
    </div>
  );
}
