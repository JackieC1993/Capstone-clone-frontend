import React from "react";
import { Link } from "react-router-dom";
import GoalHive from "../assets/gh_colorful_icon.png";
import ProfileIcon from "../assets/profile_icon.png";
import HiveChat from "../assets/chat_icon.png";
import Buddies from "../assets/find_buddy.png";
import CreateGoal from "../assets/goals_icon.png";
import "./Navbar2.css";
import "bootstrap/dist/css/bootstrap.css";

function NavBar() {
  return (
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
        {/* <Link className="navbar-link" to="/goals/new">
          <img src={CreateGoal} alt="" />
          <span>New Goal</span>
        </Link> */}
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
  );
}

export default NavBar;
{
  /* <div className="navbar fixed-bottom bg-body-tertiary" data-bs-theme="blue">
      <div className="container-fluid" data-bs-theme="blue">
        <a className="navbar-brand" href="#">
          <img
            src={GoalHive}
            alt="icon"
            width="50"
            height="50"
            className="d-inline-block align-text-top"
          />
          <span>Home</span>
        </a> 
    <nav className="nav">
    //   <Link className="navbar-link" to="/">
    //     <img id="goalhive-icon" src={GoalHive} alt="" />
    //     <span>Home</span>
    //   </Link>

    //   <Link className="navbar-link" to="/findbuddy">
    //     <img src={Buddies} alt="" />
    //     <span>Find Friends</span>
    //   </Link>

    //   <Link className="navbar-link" to="/goals/new">
    //     <img src={CreateGoal} alt="" />
    //     <span>Goals</span>
    //   </Link>

    //   <Link className="navbar-link" to="/hivechat">
    //     <img src={HiveChat} alt="" />
    //     <span>HiveChat</span>
    //   </Link>

    //   <Link className="navbar-link" to="/userprofile">
    //     <img src={ProfileIcon} alt="" />
    //     <span>Profile</span>
    //   </Link>
    // </nav>


{
  /*
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GoalHive from "../assets/gh_colorful_logo.png";
import ProfileIcon from "../assets/profile_icon.png";
import HiveChat from "../assets/chat_icon.png";
import Buddies from "../assets/find_buddy.png";
import CreateGoal from "../assets/goals_icon.png";
// import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar2.css";

const NavBar = ({ navBar, setNavBar }) => {
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    // setNavBar(false);
    if (location.pathname === "/") {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  }, [location.pathname]);

  return navBar ? (
    <nav className="nav">
      <Link className="navbar-link" to="/">
        <img id="goalhive-icon" src={GoalHive} alt="" />
        <span>Home</span>
      </Link>

      <Link className="navbar-link" to="/findbuddy">
        <img src={Buddies} alt="" />
        <span>Find Friends</span>
      </Link>

      <Link className="navbar-link" to="/goals/new">
        <img src={CreateGoal} alt="" />

        <span>Goals</span>
      </Link>

      <Link className="navbar-link" to="/hivechat">
        <img src={HiveChat} alt="" />
        <span>HiveChat</span>
      </Link>

      <Link className="navbar-link" to="/userprofile">
        <img src={ProfileIcon} alt="" />
        <span>Profile</span>
      </Link>
      <button
        onClick={() => {
          setNavBar(!navBar);
        }}
        onMouseEnter={() => {
          setNavBar(!navBar);
        }}
      >
        ↩
      </button>
    </nav>
  ) : (
    <button
      className="navbar-close"
      onClick={() => {
        setNavBar(!navBar);
      }}
      onMouseEnter={() => {
        setNavBar(!navBar);
      }}
    >
      <RxHamburgerMenu className="hamburger" />
    </button>
  );
};

export default NavBar; */
}
