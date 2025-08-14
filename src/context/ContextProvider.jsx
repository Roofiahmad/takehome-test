import { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
