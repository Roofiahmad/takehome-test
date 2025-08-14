import { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
