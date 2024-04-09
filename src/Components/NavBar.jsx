import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoalHive from "../assets/gh_colorful_icon.png";
import ProfileIcon from "../assets/profile_icon.png";
import HiveChat from "../assets/chat_icon.png";
import Buddies from "../assets/find_buddy.png";
import "./Navbar2.css";
import "bootstrap/dist/css/bootstrap.css";

const NavBar = ({ navBar, setNavBar }) => {
  const location = useLocation();
  // console.log(location);

  const showNavBar =
    location.pathname !== "/signup" && location.pathname !== "/login";

  useEffect(() => {
    setNavBar(showNavBar);
  }, [location.pathname]);

  return (
    showNavBar && (
      <div className="nav">
        <nav className="navbar fixed-bottom bg-body-tertiary">
          <Link className="navbar-link" to="/">
            <img id="goalhive-icon" src={GoalHive} alt="icon" />
            <span>Home</span>
          </Link>
          <Link className="navbar-link" to="/findbuddy">
            <img src={Buddies} alt="" />
            <span>Find Buddy</span>
          </Link>
          <Link className="navbar-link" to="/hivechat">
            <img src={HiveChat} alt="" />
            <span>HiveChat</span>
          </Link>
          <Link className="navbar-link" to="/userprofile">
            <img src={ProfileIcon} alt="" />
            <span>My Profile</span>
          </Link>
        </nav>
      </div>
    )
  );
};

export default NavBar;
