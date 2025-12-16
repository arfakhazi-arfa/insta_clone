import React, { useState, useRef } from "react";
import "./uploadPost.css";

const demoImages = [
  "../images/Post1.jpg",
  "../images/Post2.jpg",
  "../images/Post3.jpg",
  "../images/Post4.jpg",
];

const UploadPost = ({ onPost }) => {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef();

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileChange = (e) => handleFiles(e.target.files);
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const addDemoImage = (img) => setImages((prev) => [...prev, { preview: img }]);
  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const handlePostClick = () => {
    if (images.length === 0) { alert("Select at least one image!"); return; }
    const postImg = images[0].preview ? images[0].preview : images[0];
    const newPost = { id: Date.now(), username: "current_user", img: postImg, caption };
    if (onPost) onPost(newPost);
    setImages([]);
    setCaption("");
  };

  return (
    <div className="upload-container">
      <h2>Create New Post</h2>
      <div className="demo-images">
        {demoImages.map((img, i) => (
          <img key={i} src={img} alt={`demo ${i}`} className="demo-img" onClick={() => addDemoImage(img)} />
        ))}
      </div>

      <div className="upload-box" onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}>
        {images.length === 0 ? <p>Drag & drop images here, click to select, or pick demo images above</p> :
          <div className="preview-grid">
            {images.map((img, index) => (
              <div className="preview-wrapper" key={index}>
                <img src={img.preview ? img.preview : img} alt={`preview ${index}`} className="preview" />
                <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeImage(index); }}>✕</button>
              </div>
            ))}
          </div>}
        <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <textarea placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} className="caption-input" />
      <button onClick={handlePostClick} className="post-btn">Post</button>
    </div>
  );
};

export default UploadPost;
