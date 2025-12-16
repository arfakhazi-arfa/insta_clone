import React, { useState } from "react";
import "./stories.css";

// Import avatars
import currentUserAvatar from "../assets/images/profile.png";
import user1Avatar from "../assets/images/user1.png";
import user2Avatar from "../assets/images/user2.png";
import user3Avatar from "../assets/images/user3.png";
import user4Avatar from "../assets/images/user4.png";

// Import story images
import currentUserStory from "../assets/images/shizuka.jpg";
import user1Story from "../assets/images/story1.jpg";
import user2Story from "../assets/images/story2.jpg";
import user3Story from "../assets/images/story3.jpg";
import user4Story from "../assets/images/story3.jpg";

// Other users' stories
const otherStories = [
  { id: 1, name: "Alice", avatar: user1Avatar, content: user1Story },
  { id: 2, name: "Bob", avatar: user2Avatar, content: user2Story },
  { id: 3, name: "Charlie", avatar: user3Avatar, content: user3Story },
];

export default function Stories({ currentUser }) {
  // Fallback for current user
  const user = currentUser || { name: "You", avatar: currentUserAvatar, content: currentUserStory };

  const [openStory, setOpenStory] = useState(null);

  const allStories = [user, ...otherStories];

  return (
    <>
      {/* Stories row */}
      <div className="stories-container">
        {allStories.map((s) => (
          <div
            className="story"
            key={s.id || s.name}
            onClick={() => setOpenStory(s)}
          >
            <div className="story-avatar-wrapper">
              <img src={s.avatar} alt={s.name} className="story-avatar" />
              {s.name === user.name && <span className="story-add">+</span>}
            </div>
            <p className="story-name">{s.name}</p>
          </div>
        ))}
      </div>

      {/* Story overlay */}
      {openStory && (
        <div className="story-overlay" onClick={() => setOpenStory(null)}>
          <div className="story-content">
            <img src={openStory.content} alt={openStory.name} />
            <p className="story-username">{openStory.name}</p>
          </div>
        </div>
      )}
    </>
  );
}
