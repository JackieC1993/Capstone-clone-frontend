import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import React from "react";
// import toggle from "../assets/toggle.png";
import logo from "../assets/gh_text_logo.png";
// import quote from "../assets/quote.png";

import "./Login.css";

const Login = ({ setUser, setToken, user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password_hash: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${API}/profiles/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.user.userprofile_id) {
          const { user, token } = res;
          console.log({ user, token });
          setUser(user);
          setToken(token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(token));
          setFormData(() => ({
            username: "",
            password_hash: "",
          }));
          navigate("/");
        } else {
          console.log("Something went wrong", res);
        }
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   if (user && token) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", JSON.stringify(token));
  //   }
  // }, [user, token]);

  // const storedUser = () => {
  //   const storedUserData = localStorage.getItem("user")
  //   if (storedUserData){
  //     setUser(JSON.parse(storedUserData))
  //     console.log(storedUserData)
  //   }
  // }

  return (
    <div id="login" className="login">
      <img id="login-logo" src={logo} style={{ width: 225, height: 300 }} />
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="login-username">
          <Form.Label id="login-username-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="form-control-sm"
          />
        </Form.Group>
        <Form.Group controlId="login-password">
          <Form.Label id="login-password-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleInputChange}
            required
            className="form-control-sm"
          />
        </Form.Group>{" "}
        <br />
        <button
          className="css-button-3d--green"
          type="submit"
          id="login-button"
        >
          LOGIN
        </button>
      </Form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
