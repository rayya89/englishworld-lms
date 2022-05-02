// NPM packages
import React from "react";
import ReactDOM from "react-dom/client";

// Project files
import App from "./App";
import { UserProvider } from "./state/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
