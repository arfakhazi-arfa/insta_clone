import React, { useState } from "react";
import "./login.css";
import phoneMock from "../assets/images/img1.png";
import instaLogo from "../assets/images/instagramLogo.png";
import { API, api } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post(api.Auth.login, {
        email: email,
        password: password
      });
      
      const data = res.data;

      if (!data.status) {
        alert(data.message);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(data.message);
        onLogin(data.user.username);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="left-side">
        <img src={phoneMock} alt="Instagram Preview" className="phone-img" />
      </div>

      <div className="right-side">
        <div className="login-box">
          <img src={instaLogo} alt="Instagram" className="insta-logo" />

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="divider">
            <span></span> OR <span></span>
          </div>
        </div>

        <div className="signup-box">
          Don’t have an account?{" "}
          <a href="/register" className="signup-btn">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
