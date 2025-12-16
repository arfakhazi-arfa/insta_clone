import React, { useState } from "react";
import "./postCard.css";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="post-card">
      {/* HEADER */}
      <div className="post-header">
        <img src={post.profileImg} alt={post.username} className="profile-img" />
        <div className="user-info">
          <strong>{post.username}</strong>
          <div className="location">{post.location}</div>
        </div>
      </div>

      {/* IMAGE */}
      <img src={post.image} alt="post" className="post-img" />

      {/* ACTIONS */}
      <div className="post-actions">
        <span className="action-btn" onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </span>
        <span className="action-btn" onClick={() => setShowCommentBox(!showCommentBox)}>
          💬
        </span>
        <span className="action-btn">📤</span>
      </div>

      {/* LIKES */}
      <div className="likes-count">{likes} likes</div>

      {/* CAPTION */}
      <div className="caption">
        <strong>{post.username}</strong> {post.caption}
      </div>

      {/* COMMENTS */}
      {comments.length > 0 && (
        <div className="comments">
          {comments.map((c, i) => (
            <div key={i} className="comment">
              {c}
            </div>
          ))}
        </div>
      )}

      {/* ADD COMMENT */}
      {showCommentBox && (
        <div className="comment-box">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
      )}
    </div>
  );
}
