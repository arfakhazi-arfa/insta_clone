import React, { useState } from "react";
import Stories from "../components/stories";
import PostCard from "../components/postCard";
import "./home.css";


// Images
import profileImg from "../assets/images/profile.png";
import post1 from "../assets/images/post1.jpg";
import post2 from "../assets/images/post2.jpg";
import post3 from "../assets/images/post3.jpg";
import post4 from "../assets/images/post4.jpg";

import user1Img from "../assets/images/user1.png";
import user2Img from "../assets/images/user2.png";
import user3Img from "../assets/images/user3.png";
import user4Img from "../assets/images/user4.png";

import user1Story from "../assets/images/story1.jpg";
import user2Story from "../assets/images/story2.jpg";
import user3Story from "../assets/images/story3.jpg";
import user4Story from "../assets/images/story4.jpg";

// Posts data with individual profile images
const homePosts = [
  {
    id: 1,
    profileImg: user1Img,
    username: "arfa7795",
    location: "Bangalore",
    image: post1,
    caption: "Fun day ",
    likes: 340,
    comments: ["Nice!", "Cool "],
  },
  {
    id: 2,
    profileImg: user2Img,
    username: "sarah",
    location: "Delhi",
    image: post2,
    caption: "Happy vibes ",
    likes: 210,
    comments: [],
  },
  {
    id: 3,
    profileImg: user3Img,
    username: "arham",
    location: "Mumbai",
    image: post3,
    caption: "Bliss",
    likes: 500,
    comments: ["Amazing "],
  },
  {
    id: 4,
    profileImg: user4Img,
    username: "zoya123",
    location: "Hyderabad",
    image: post4,
    caption: "Weekend mood 😎",
    likes: 150,
    comments: [],
  },
];

// Suggestions / chat users
const suggestions = [
  { id: 1, name: "Alice", avatar: user1Img },
  { id: 2, name: "Bob", avatar: user2Img },
  { id: 3, name: "Charlie", avatar: user3Img },
];

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="home-layout">
      {/* Center feed */}
      <div className="home-main">
        <Stories
          currentUser={{ name: "You", avatar: profileImg, content: post4 }}
          otherStories={[
            { id: 1, name: "Alice", avatar: user1Img, content: user1Story },
            { id: 2, name: "Bob", avatar: user2Img, content: user2Story },
            { id: 3, name: "Charlie", avatar: user3Img, content: user3Story },
          ]}
        />

        <div className="feed-area">
          {homePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="home-right">
        <h3>Suggestions for you</h3>
        <ul className="suggest-list">
          {suggestions.map((s) => (
            <li key={s.id} className="suggest-user">
              <div className="right-profile">
                <img src={s.avatar} alt={s.name} />
                <span>{s.name}</span>
              </div>
              <button>Follow</button>
            </li>
          ))}
        </ul>

        <button
          className="chat-toggle-btn"
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? "Close Messages" : "Open Messages"}
        </button>

        {showChat && (
          <div className="chat-list">
            <h4>Chats</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  className="chat-user"
                  onClick={() => alert(`Open chat with ${s.name}`)}
                >
                  <strong>{s.name}</strong>
                  <p>Last message...</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
