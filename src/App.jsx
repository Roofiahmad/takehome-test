import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Posts from "./components/Posts";
import Albums from "./components/Albums";
import PostDetails from "./components/PostDetails";
import AlbumDetails from "./components/AlbumDetails";
import PhotoDetails from "./components/PhotoDetails";
import ContextProvider from "./context/ContextProvider";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:userId" element={<Posts />} />
          <Route path="/albums/:userId" element={<Albums />} />
          <Route path="/post-details/:postId" element={<PostDetails />} />
          <Route path="/album-details/:albumId" element={<AlbumDetails />} />
          <Route path="/photo-details/:photoId" element={<PhotoDetails />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
