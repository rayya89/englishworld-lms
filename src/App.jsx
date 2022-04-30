//NPM packages
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Project files
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
