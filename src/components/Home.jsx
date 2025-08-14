import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response.data);
        if (response?.data?.length) {
          setUsers(() => response.data);
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
      <div>Home</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {users.map((u) => (
          <div
            key={u.id}
            style={{
              width: 200,
              height: 200,
              border: "1px solid grey",
              borderRadius: 5,
            }}
          >
            <p>{u.name}</p>
            <div>
              <Link to={`/posts/${u.id}`}>
                <button>posts</button>
              </Link>
              <Link to={`/albums/${u.id}`}>
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
