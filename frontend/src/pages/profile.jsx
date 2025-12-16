import React, { useState } from "react";
import "./profile.css";
import ProfilePostCard from "../components/profilePostCard";

// Common posts
import profileImg from "../assets/images/profile.png";
import post1 from "../assets/images/post1.jpg";
import post2 from "../assets/images/post2.jpg";
import post3 from "../assets/images/post3.jpg";

// Suggestion avatars
import user1Img from "../assets/images/user1.png";
import user2Img from "../assets/images/user2.png";
import user3Img from "../assets/images/user3.png";

export default function Profile() {
  // Users and their posts (using existing images)
  const allUsers = {
    current: {
      name: "You",
      profileImg,
      posts: [
        { id: 1, image: post1, caption: "My first post 😊", likes: 120, comments: ["Nice ❤️"] },
        { id: 2, image: post2, caption: "Learning React 🔥", likes: 95, comments: [] },
        { id: 3, image: post3, caption: "Frontend life 💻", likes: 180, comments: ["Great work 👏"] },
      ],
    },
    Alice: {
      name: "Alice",
      profileImg: user1Img,
      posts: [
        { id: 1, image: post2, caption: "Alice's first post", likes: 50, comments: [] },
        { id: 2, image: post3, caption: "Alice React post", likes: 75, comments: ["Wow!"] },
      ],
    },
    Bob: {
      name: "Bob",
      profileImg: user2Img,
      posts: [
        { id: 1, image: post3, caption: "Bob's post", likes: 100, comments: ["Cool"] },
        { id: 2, image: post1, caption: "Bob second post", likes: 30, comments: [] },
      ],
    },
    Charlie: {
      name: "Charlie",
      profileImg: user3Img,
      posts: [
        { id: 1, image: post1, caption: "Charlie's only post", likes: 10, comments: [] },
      ],
    },
  };

  // State for selected profile
  const [selectedUser, setSelectedUser] = useState("current");

  // Follow/Unfollow state
  const [following, setFollowing] = useState({ Alice: false, Bob: false, Charlie: false });

  // Suggestions
  const suggestions = [
    { id: 1, name: "Alice", avatar: user1Img },
    { id: 2, name: "Bob", avatar: user2Img },
    { id: 3, name: "Charlie", avatar: user3Img },
  ];

  const handleFollow = (name) => {
    setFollowing((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="profile-page" style={{ display: "flex", gap: "20px" }}>
      {/* Left main section */}
      <div style={{ flex: 3 }}>
        {/* HEADER */}
        <div className="profile-header">
          <img src={allUsers[selectedUser].profileImg} alt="profile" className="profile-pic" />
          <div className="profile-info">
            <h2>{allUsers[selectedUser].name}</h2>
            <div className="profile-stats">
              <span>
                <strong>{allUsers[selectedUser].posts.length}</strong> posts
              </span>
              <span>
                <strong>1,234</strong> followers
              </span>
              <span>
                <strong>567</strong> following
              </span>
            </div>
            <div className="profile-bio">
              <strong>{allUsers[selectedUser].name}</strong>
              <p>💻 Frontend Developer</p>
              <p>📍 India</p>
            </div>
          </div>
        </div>

        {/* USER POSTS */}
        <div className="profile-posts">
          {allUsers[selectedUser].posts.map((post) => (
            <ProfilePostCard key={post.id} post={{ ...post, username: allUsers[selectedUser].name }} />
          ))}
        </div>
      </div>

      {/* Right suggestions sidebar */}
      <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
        <h2>Suggestions for you</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {suggestions.map((s) => (
            <li
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px",
                cursor: "pointer",
              }}
            >
              {/* Clicking avatar/name switches profile */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => setSelectedUser(s.name)}
              >
                <img
                  src={s.avatar}
                  alt={s.name}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <span>{s.name}</span>
              </div>
              <button
                onClick={() => handleFollow(s.name)}
                style={{
                  backgroundColor: following[s.name] ? "#ccc" : "#0095f6",
                  color: following[s.name] ? "#000" : "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                {following[s.name] ? "Following" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
