import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    userId: null,
    id: null,
    title: "",
    body: "",
  });
  const [comments, setComments] = useState([]);

  const getPost = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (response?.data) {
          setPost(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getComments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        if (response?.data?.length) {
          setComments(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (postId) {
      getPost();
      getComments();
    }
  }, [postId]);

  return (
    <div
      style={{
        width: "90%",
        height: "90%",
        padding: 10,
        margin: "auto",
      }}
    >
      <h3>{post.title}</h3>
      <p style={{ textAlign: "left" }}>{post.body}</p>
      <div style={{ textAlign: "left" }}>
        <b>Comments : </b>
        {comments.map((c) => (
          <div
            key={c.id}
            style={{
              marginBottom: 24,
              border: "1px solid grey",
              borderRadius: 5,
              padding: 8,
            }}
          >
            <b>
              {c.name} / {c.email}
            </b>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
