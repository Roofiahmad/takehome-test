import { useState } from "react";
import Context from "./Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ContextProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [loading, setLoading] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
      </Context.Provider>
    </QueryClientProvider>
  );
};

export default ContextProvider;
