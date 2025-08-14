import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/Context";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    userId: null,
    id: null,
    title: "",
    body: "",
  });
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  // const [editId, setEditId] = useState(null);
  const { user, setLoading } = useContext(Context);

  const getPost = () => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (response?.data) {
          setPost(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getComments = () => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        if (response?.data?.length) {
          setComments(() => response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const postComment = (value) => {
    const data = {
      postId: +postId,
      userId: user.id,
      name: user.name,
      email: user.email,
      body: value,
    };

    // const axiosMethod = editId ? axios.put : axios.post;
    // const url = editId
    //   ? `https://jsonplaceholder.typicode.com/comments/${editId}`
    //   : `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

    const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

    setLoading(true);
    axios
      .post(url, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        if (response?.data) {
          setComments((prevState) => [
            ...prevState.filter((c) => c.id !== +response.data.id),
            { ...response.data, postId: +response.data.postId },
          ]);

          setCommentValue(() => "");
          // setEditId(() => null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteComment = (comment) => {
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${comment.id}`)
      .then((response) => {
        if (response?.data) {
          setComments((prevState) => [
            ...prevState.filter((c) => c.id !== comment.id),
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentValue.trim()) return alert("comment can't be empty");
    if (!user?.id) return alert("cannot find user");
    postComment(commentValue);
  };

  const handleEdit = (c) => {
    // setEditId(() => c.id);
    setCommentValue(() => c.body);
  };

  const handleDelete = (c) => {
    deleteComment(c);
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
            {c.email == user.email && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                <button onClick={() => handleDelete(c)}>delete</button>
                <button onClick={() => handleEdit(c)}>edit</button>
              </div>
            )}
          </div>
        ))}
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="message">Your Comment:</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            cols="50"
            value={commentValue}
            onChange={(e) => setCommentValue(() => e.target.value)}
          ></textarea>
          <button type="submit">submit comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
