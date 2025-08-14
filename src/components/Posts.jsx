import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Posts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (response?.data?.length) {
          setPosts(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  return (
    <>
      <div>Posts</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {posts.map((p) => (
          <div
            key={p.id}
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
            <p>{p.title}</p>
            <Link to={`/post-details/${p.id}`}>
              <button>details</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
