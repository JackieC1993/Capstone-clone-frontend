import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Feed from "./Feed";
import "./home.css";

const Home = ({ user, token }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!user || !token) {
      // Change the condition to check if user or token is missing
      navigate("/login");
    }
  }, [user, token, navigate]); // Add user, token, and navigate to the dependency array

  return (
    <div className="home">
      <h3>Your GoalHive Feed</h3>
      <Feed user={user} token={token} />
    </div>
  );
};

export default Home;
