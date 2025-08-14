import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

const Home = () => {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(Context);

  const getUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response?.data?.length) {
          setUsers(() => response.data);

          // set logged user, assume user on first index
          let user = response.data[0];
          setUser(() => user);
          sessionStorage.setItem("user", JSON.stringify(user));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>Users</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {users.map((u) => (
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
