import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../context/Context";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const Posts = () => {
  const { userId } = useParams();
  // const queryClient = useQueryClient();
  const { user: storedUser } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const resetState = () => {
    setPostBody(() => "");
    setPostTitle(() => "");
    setSelectedPost(() => null);
  };

  const { data: fetchedPosts, isPostsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes,
    throwOnError: true,
  });

  const { mutate: performDeletePost, isLoading: isDeleteLoading } = useMutation(
    {
      mutationFn: (postId) =>
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      onSuccess: (data, postId) => {
        // queryClient.invalidateQueries({ queryKey: ["posts", userId] });
        setPosts((prevState) => [...prevState.filter((p) => p.id !== postId)]);
        resetState();
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
      },
    }
  );

  const { mutate: performUpdateOrCreatePost, isLoadingUpdatePost } =
    useMutation({
      mutationFn: async (postData) => {
        let axiosMethod = postData.id ? axios.put : axios.post;
        let url = `https://jsonplaceholder.typicode.com/posts/${
          postData.id || ""
        }`;

        // We can rely on axios to set the headers correctly for JSON
        const { data } = await axiosMethod(url, postData);
        return data;
      },
      onSuccess: (newPostData) => {
        // queryClient.invalidateQueries({ queryKey: ['posts'] });
        setPosts((prevState) => [
          ...prevState.filter((p) => p.id !== newPostData.id),
          { ...newPostData, userId: +newPostData.userId },
        ]);
        resetState();
      },
      onError: (error) => {
        console.error("Error creating/updating post:", error);
      },
    });

  const deletePost = (post) => performDeletePost(post?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postTitle.trim()) return alert("title can't be empty");
    if (!postBody.trim()) return alert("body can't be empty");
    if (!userId) return alert("userId can't be empty");

    let data = {
      title: postTitle,
      body: postBody,
      userId: +userId,
    };

    if (selectedPost?.id) {
      // If we are in edit mode, add the ID
      data.id = selectedPost.id;
    }
    performUpdateOrCreatePost(data);
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
    if (fetchedPosts && fetchedPosts.length) {
      setPosts(() => fetchedPosts);
    }
  }, [fetchedPosts]);

  return (
    <>
      <Spinner
        loading={isPostsLoading || isDeleteLoading || isLoadingUpdatePost}
      />
      <div> {storedUser?.id == userId ? "My Posts" : "Posts"}</div>
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

              {storedUser?.id == p?.userId && (
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
              )}
            </div>
          ))}
      </div>

      {storedUser?.id == userId && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
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
      )}
    </>
  );
};

export default Posts;
