import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createPost.css";

const CreatePost = ({ onPost, user }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption || !image) return alert("Please add caption and image");
    
    const newPost = {
      id: Date.now(),
      username: user.username,
      caption,
      image: URL.createObjectURL(image),
    };

    onPost(newPost);
    setCaption("");
    setImage(null);
  };

  return (
    <div className="create-post-wrapper">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default CreatePost;
