// NPM packages
import { createContext, useContext, useState } from "react";

// Properties
const Context = createContext(null);

export function UserProvider({ children }) {
  // Local state
  const [user, setUser] = useState(null);

  //Properties
  const value = { user, setUser };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);
  const errorText =
    "To use useUser(), wrap the parent component with <UserProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
