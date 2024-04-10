import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Feed from "./Feed";
import { useAnimating } from "react-scroll-to-bottom";


const Home = ({ user, token }) => {
 const navigate = useNavigate();
    useEffect(() => {
      if (!user && !token) {
       navigate("/login");
      }
    }, []);

  return (
    <div className="home">
      {/* <h1>This is the home page!!</h1> */}
      <Feed user={user} token={token} />
    </div>
  );
};

export default Home;
