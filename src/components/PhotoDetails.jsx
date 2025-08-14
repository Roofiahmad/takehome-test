import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const PhotoDetails = () => {
  const { photoId } = useParams();
  const { picsumUrl } = useLocation().state;
  const [photo, setPhoto] = useState({});

  const getPhotoDetails = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then((response) => {
        if (response?.data) {
          setPhoto((prevState) => ({ ...prevState, ...response.data }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (photoId) getPhotoDetails();
  }, [photoId]);

  return (
    <>
      <div>PhotoDetails</div>
      <p>{photo.title}</p>
      <img src={picsumUrl} alt={photo.title} />
    </>
  );
};

export default PhotoDetails;
