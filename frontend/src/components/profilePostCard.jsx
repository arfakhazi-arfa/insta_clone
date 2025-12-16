import React, { useState } from "react";
import "./profilePostCard.css";

export default function ProfilePostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="profile-post-card">
      <img
        src={post.image}
        alt="post"
        className="profile-post-img"
        onClick={() => setShowComments(!showComments)}
      />

      {showComments && (
        <div className="profile-post-overlay">
          <div className="actions">
            <span onClick={handleLike}>
              {liked ? "❤️" : "🤍"} {likes}
            </span>
            <span onClick={() => setShowComments(true)}>
              💬 {comments.length}
            </span>
          </div>

          <div className="caption">
            <strong>{post.username}</strong> {post.caption}
          </div>

          <div className="comments">
            {comments.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>

          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={addComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
