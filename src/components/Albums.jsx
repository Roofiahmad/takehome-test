import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../context/Context";

const Albums = () => {
  const { userId } = useParams();
  const { setLoading } = useContext(Context);
  const [albums, setAlbums] = useState([]);

  const getPosts = () => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then((response) => {
        if (response?.data?.length) {
          setAlbums(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userId) getPosts();
  }, [userId]);

  return (
    <>
      <div>Albums</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {albums.map((a) => (
          <div
            key={a.id}
            style={{
              width: 200,
              height: 200,
              border: "1px solid grey",
              borderRadius: 5,
            }}
          >
            <p>{a.title}</p>
            <Link to={`/album-details/${a.id}`}>
              <button>details</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Albums;
