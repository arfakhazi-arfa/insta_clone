import React from "react";
import { Link, useLocation } from "react-router-dom";
import instagramLogo from "../assets/images/instagramLogo.png";
import "./navBar.css";

const navItems = [
  { icon: "🏠", text: "Home", path: "/" },
  { icon: "🔍", text: "Search", path: "/search" },
  { icon: "🎬", text: "Reels", path: "/reels" },
  { icon: "✉️", text: "Messages", path: "/messages" }, // We'll handle click differently
  { icon: "❤️", text: "Notifications", path: "/notifications" },
  { icon: "➕", text: "Create", path: "/create" },
  { icon: "👤", text: "Profile", path: "/profile" },
];

export default function Navbar({ user, logout, onMessagesClick }) {
  const location = useLocation();

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={instagramLogo} alt="Instagram" className="logo" />
      </div>

      {/* Nav items */}
      <div className="nav-items">
        {navItems.map((item, i) => {
          // For Messages, call onMessagesClick instead of navigating
          if (item.text === "Messages") {
            return (
              <div
                key={i}
                className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
                onClick={onMessagesClick} // <-- open sidebar
                style={{ cursor: "pointer" }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            );
          }

          return (
            <Link
              key={i}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.text}</span>
            </Link>
          );
        })}
      </div>

      {/* More menu */}
      <div className="more-wrapper">
        <MoreMenu logout={logout} />
      </div>
    </div>
  );
}

function MoreMenu({ logout }) {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <>
      <div className="nav-item" onClick={() => setShowMore(!showMore)}>
        <span className="nav-icon">☰</span>
        <span>More</span>
      </div>

      {showMore && (
        <div className="more-menu">
          <div className="more-item">Settings</div>
          <div className="more-item">Saved</div>
          <div className="more-item logout-btn" onClick={logout}>
            Logout
          </div>
        </div>
      )}
    </>
  );
}
