// NPM packages
import React from "react";
import ReactDOM from "react-dom/client";

// Project files
import App from "./App";
import { UserProvider } from "./state/UserContext";
import { UidProvider } from "./state/UidContext";
import { CoursesProvider } from "./state/CoursesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UidProvider>
    <UserProvider>
      <CoursesProvider>
        <App />
      </CoursesProvider>
    </UserProvider>
  </UidProvider>
);
