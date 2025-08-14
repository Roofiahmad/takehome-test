import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Posts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

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

  const createPost = () => {
    let data = {
      title: postTitle,
      body: postBody,
      userId: +userId,
    };

    let axiosMethod = axios.post;
    let url = `https://jsonplaceholder.typicode.com/posts`;

    if (selectedPost?.id) {
      // selectedPost will filled on edit mode
      data = {
        ...data,
        id: selectedPost?.id,
      };

      axiosMethod = axios.put;
      url = `https://jsonplaceholder.typicode.com/posts/${selectedPost?.id}`;
    }

    axiosMethod(url, data, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response?.data) {
          setPosts((prevState) => [
            ...prevState.filter((p) => p.id !== response.data.id),
            { ...response.data, userId: +response.data.userId },
          ]);

          // reset state
          setPostBody(() => "");
          setPostTitle(() => "");
          setSelectedPost(() => null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deletePost = (post) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${post?.id}`)
      .then((response) => {
        if (response?.data) {
          setPosts((prevState) => [
            ...prevState.filter((p) => p.id !== post.id),
          ]);

          // reset state
          setPostBody(() => "");
          setPostTitle(() => "");
          setSelectedPost(() => null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  const handleEdit = (p) => {
    setSelectedPost(() => p);
    setPostBody(() => p.body);
    setPostTitle(() => p.title);
  };

  const handleDelete = (p) => {
    setSelectedPost(() => p);
    deletePost(p);
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
        {posts
          .sort((a, b) => a.id - b.id)
          .map((p) => (
            <div
              key={p.id}
              style={{
                width: 200,
                height: 250,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 20,
                }}
              >
                <button onClick={() => handleEdit(p)}>edit</button>
                <button onClick={() => handleDelete(p)}>delete</button>
              </div>
            </div>
          ))}
      </div>

      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={postTitle}
          onChange={(e) => setPostTitle(() => e.target.value)}
        ></input>
        <label htmlFor="body">Post Body:</label>
        <textarea
          id="body"
          name="body"
          rows="4"
          cols="50"
          value={postBody}
          onChange={(e) => setPostBody(() => e.target.value)}
        ></textarea>
        <button type="submit">submit new post</button>
      </form>
    </>
  );
};

export default Posts;
