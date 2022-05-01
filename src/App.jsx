//NPM packages
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

//Project files
import UnloggedRoutes from "./routes/UnloggedRoutes";
import StudentsRoutes from "./routes/StudentsRoutes";

export default function App() {
  //Local state
  const [uid, setUid] = useState(null);
  console.log("App.jsx", uid);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes> */}
        {uid && <StudentsRoutes uidState={[uid, setUid]} />}
        {!uid && <UnloggedRoutes uidState={[uid, setUid]} />}
      </BrowserRouter>
    </div>
  );
}
