import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/gh_text_logo.png";
import "./Signup.css";

const Signup = ({ setUser, setToken }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password_hash: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API}/profiles`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log("The response: ",res);
        if (res.user.userprofile_id) {
          setUser(res.user);
          setToken(res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));
          setFormData(() => ({
            username: "",
            email: "",
            password_hash: "",
          }));
          navigate("/profiles/newProfile");
        } else {
          console.log("The error: ", res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <img
        className="signup-logo"
        src={logo}
        style={{ width: 300, height: 350 }}
      />
      <br />
      <form className="signup-css" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="...create a username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          id="username"
        />
        <br />
        <input
          type="email"
          placeholder="...enter your email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          id="email"
        />
        <br />
        <input
          type="password"
          placeholder="...create a password"
          name="password_hash"
          value={formData.password_hash}
          onChange={handleInputChange}
          required
          id="password"
        />
        <br />
        <button
          className="css-button-3d--green"
          id="signup-create"
          type="submit"
        >
          CREATE ACCOUNT
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
