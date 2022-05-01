//NPM packages
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

//Project files
import UnloggedRoutes from "./routes/UnloggedRoutes";
import StudentsRoutes from "./routes/StudentsRoutes";

export default function App() {
  //Local state
  const [uid, setUid] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        {uid && <StudentsRoutes uidState={[uid, setUid]} />}
        {!uid && <UnloggedRoutes uidState={[uid, setUid]} />}
      </BrowserRouter>
    </div>
  );
}
