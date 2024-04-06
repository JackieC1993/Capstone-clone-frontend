import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./UserProfile.css";
import Goals from "./Goals";
import profilePic from "../assets/profile-male-blue.png";
import { FaPlusCircle } from "react-icons/fa";
// import { Button2 } from "flowbite-react";

const UserProfile = ({ setUser, setToken, user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  // console.log("The user: ", user);
  const [profiles, setProfiles] = useState({});
  const [selectedGoals, setSelectedGoals] = useState(false);
  // const [goals, setGoals] = useState({});

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchData = () => {
    try {
      fetch(`${API}/profiles/${user.userprofile_id}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setProfiles(res);
          // console.log("The response from fetch: ", res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("user obj:", profiles);

  return (
    <div className="userprofile-container">
      <div className="userprofile-picture">
        <img id="userprofile-image" src={profilePic} alt="Profile Image" />
      </div>
      <div className="userprofile-header">
        <h4>
          {profiles.firstname} {profiles.lastname}
        </h4>
        <h6>
          {`@${profiles.username}`}
          <br />
          <br />
          Age: {profiles.age}
          <br />
          Gender: {profiles.gender}
        </h6>
      </div>
      <br />
      <div className="logout-button">
        <Button
          className="lg-button"
          onClick={handleLogout}
          style={{ color: "white" }}
        >
          Log Out
        </Button>
      </div>

      <div className="bio">
        <div className="bio-wrapper">
          <p className="bold" style={{ color: "white" }}>
            Bio:
          </p>
          <p className="ital-bio">{profiles.bio}</p>
        </div>
      </div>
      <br />
      <div className="active">
        <button
          className="css-button-3d--sky"
          onClick={() => setSelectedGoals(false)}
        >
          Active Goals
        </button>
      </div>
      <div className="completed">
        <button
          className="css-button-3d--sand"
          onClick={() => setSelectedGoals(true)}
        >
          Completed
        </button>
      </div>
      {/* <div className="profile-goals"> */}
      {!selectedGoals ? (
        <Goals user={user} token={token} />
      ) : (
        <span>List of Completed Goals</span>
      )}
      {/* </div> */}
      <Link to="/goals/new" className="newgoal-button">
        <FaPlusCircle className="newgoal-icon" />
      </Link>
    </div>
  );
};

export default UserProfile;
