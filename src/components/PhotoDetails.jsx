import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Context from "../context/Context";

const PhotoDetails = () => {
  const { photoId } = useParams();
  const { picsumUrl } = useLocation().state;
  const [photo, setPhoto] = useState({});
  const { setLoading } = useContext(Context);

  const getPhotoDetails = () => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then((response) => {
        if (response?.data) {
          setPhoto((prevState) => ({ ...prevState, ...response.data }));
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
