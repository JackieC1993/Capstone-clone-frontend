import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import React from "react";
import toggle from "../assets/toggle.png";
import logo from "../assets/gh_text_logo.png";
import quote from "../assets/quote.png";

import "./login.css";

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
    <div className="login">
      <img id="login-logo" src={logo} style={{ width: 300, height: 400 }} />

      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label id="password-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleInputChange}
            required
            className="form-control-sm"
          />
        </Form.Group>

        <button className="css-button-3d--green" type="submit">
          Log in
        </button>
      </Form>

      {/* <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          name="password_hash"
          value={formData.password_hash}
          onChange={handleInputChange}
          required
        />

        <br />
        <br />

        <button type="submit">LOGIN</button>
      </form> */}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
