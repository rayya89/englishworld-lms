// NPM packages
import { createContext, useContext, useState } from "react";

// Properties
const Context = createContext(null);

export function UidProvider({ children }) {
  // Local state
  const [uid, setUid] = useState(null);

  //Properties
  const value = { uid, setUid };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUid() {
  const context = useContext(Context);
  const errorText =
    "To use useUid(), wrap the parent component with <UidProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
