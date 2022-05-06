// NPM packages
import { createContext, useContext, useState } from "react";

// Properties
const Context = createContext(null);

export function CoursesProvider({ children }) {
  // Local state
  const [courses, setCourses] = useState([]);

  //Properties
  const value = { courses, setCourses };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCourses() {
  const context = useContext(Context);
  const errorText =
    "To use useUser(), wrap the parent component with <CoursesProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
