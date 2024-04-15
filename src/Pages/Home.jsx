import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Feed from "./Feed";
import { useAnimating } from "react-scroll-to-bottom";

import "./home.css";

const Home = ({ user, token }) => {
 const navigate = useNavigate();
    useEffect(() => {
      if (!user && !token) {
       navigate("/login");
      }
    }, [user, token, navigate]);

  return (
    <div className="home">
      <h3 style={{color: "white"}}>GoalHive</h3>
      <Feed user={user} token={token} />
    </div>
  );
};

export default Home;
