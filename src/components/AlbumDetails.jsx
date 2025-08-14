import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);

  const getPhotos = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((response) => {
        if (response?.data?.length) {
          setPhotos(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (albumId) getPhotos();
  }, [albumId]);

  return (
    <>
      <div>AlbumDetails</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {photos.map((p, i) => (
          <Link
            to={`/photo-details/${p.id}`}
            key={p.id}
            style={{
              width: 200,
              height: "auto",
              border: "1px solid grey",
              borderRadius: 5,
            }}
            state={{ picsumUrl: `https://picsum.photos/id/${i}/200` }}
          >
            <img src={`https://picsum.photos/id/${i}/200`} />
            <p style={{ color: "grey" }}>{p.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AlbumDetails;
