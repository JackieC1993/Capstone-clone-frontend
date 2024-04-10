import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoalHive from "../assets/gh_colorful-emerald.png";
import ProfileIcon from "../assets/profile_icon-emerald.png";
import HiveChat from "../assets/chat_icon-emerald.png";
import Buddies from "../assets/find_buddy-emerald.png";
import "./navBar.css";
import "bootstrap/dist/css/bootstrap.css";
import { CiCirclePlus } from "react-icons/ci";

const NavBar = ({ navBar, setNavBar }) => {
  const location = useLocation();
  // console.log(location);

  const showNavBar =
    location.pathname !== "/signup" && location.pathname !== "/login";

  useEffect(() => {
    setNavBar(showNavBar);
  }, [location.pathname]);


  return navBar ? (
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
        <Link className="navbar-link" to="/create">
          <CiCirclePlus className="nav-icon" size={"90px"} color="#3f7cac" />
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
  ) : (
    <div></div>
  );
};

export default NavBar;
