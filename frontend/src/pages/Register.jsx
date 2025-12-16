import React, { useState } from "react";
import "./register.css";
import instaLogo from "../assets/images/instagramLogo.png";
import { API, api } from "../api"; // import axios instance and endpoints

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !fullName || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    // Optional: email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(api.Auth.register, {
        email,
        username,
        password,
        full_name: fullName
      });

      const data = response.data;

      if (data.status === false) {
        alert(data.message || "Registration failed");
      } else {
        alert(data.message || "Account created successfully!");
        console.log("Backend response:", data);

        setEmail("");
        setFullName("");
        setUsername("");
        setPassword("");
      }
    } 
    catch (error) {
      console.error("Register error:", error);
      alert("Server error. Please try again later.");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <img src={instaLogo} className="register-logo" alt="Instagram" />
        <p className="top-text">
          Sign up to see photos and videos from your friends.
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Mobile Number or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>

      <div className="login-redirect-box">
        Have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}
