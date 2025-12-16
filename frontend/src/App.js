import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import CreatePost from "./components/createPost";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  // LOGIN HANDLER
  const handleLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
    navigate("/");
  };

  // LOGOUT HANDLER
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  // NAVIGATION HANDLERS
  const goToRegister = () => navigate("/register");
  const goToForgot = () => alert("Forgot Password clicked"); // Placeholder for forgot page

  // ADD POST
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
    navigate("/");
  };

  // NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              goToRegister={goToRegister}
              goToForgot={goToForgot}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Login
              onLogin={handleLogin}
              goToRegister={goToRegister}
              goToForgot={goToForgot}
            />
          }
        />
      </Routes>
    );
  }

  // LOGGED IN
  return (
    <>
      <Navbar user={user} logout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/create"
          element={<CreatePost onPost={addPost} user={user} />}
        />
      </Routes>
    </>
  );
}
