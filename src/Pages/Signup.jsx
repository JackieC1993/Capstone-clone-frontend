import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/gh_text_logo.png";
import "./Signup.css";
import { Form } from "react-bootstrap";

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
      <img id="signup-logo" src={logo} style={{ width: 225, height: 300 }} />
      <Form id="signup-form" onSubmit={handleSubmit}>
        <Form.Group controlId="signup-username">
          <Form.Label id="signup-username-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Create a username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="form-control-sm"
          />
        </Form.Group>
        <Form.Group controlId="signup-email">
          <Form.Label id="signup-email-label">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-control-sm"
          />
        </Form.Group>
        <br />
        <Form.Group controlId="signup-password">
          <Form.Label id="signup-password-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create a password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleInputChange}
            required
            className="form-control-sm"
          />
        </Form.Group>
        <br />
        <button
          className="css-button-3d--green"
          type="submit"
          id="signup-button"
        >
          CREATE ACCOUNT
        </button>
      </Form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
