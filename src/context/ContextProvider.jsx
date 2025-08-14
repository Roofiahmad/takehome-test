import { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
