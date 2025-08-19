import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const Home = () => {
  console.log("render home");
  const { setUser } = useContext(Context);
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "");
    if (users && users.length && storedUser) {
      let user = users[0];
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [users, setUser]);

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      <Spinner loading={isLoading} />
      <div>Users</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {users &&
          users.map((u) => (
            <div
              key={u.id}
              style={{
                width: 200,
                height: 200,
                padding: 10,
                border: "1px solid grey",
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>{u.name}</p>
              <div>
                <Link to={`/posts/${u.id}`}>
                  <button>posts</button>
                </Link>
                <Link to={`/albums/${u.id}`} style={{ marginLeft: 8 }}>
                  <button>album</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
