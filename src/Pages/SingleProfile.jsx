import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./SingleProfile.css";
import profilePic from "../assets/profile-male-blue.png";
import profilePic2 from "../assets/profile-female-lightblue.png";

const SingleProfile = ({ setUser, setToken, user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [goals, setGoals] = useState([]);
  const { userprofile_id } = useParams();
//   console.log(userprofile_id)
//   console.log(user.userprofile_id)
  let sender_user_profile_id = user.userprofile_id
  let receiver_user_profile_id = userprofile_id
  console.log(sender_user_profile_id)
  console.log(receiver_user_profile_id)
  const [selectedGoals, setSelectedGoals] = useState(false);
  const [friendRequestData, setFriendRequestData] = useState({
    sender_user_profile_id: parseInt(sender_user_profile_id),
    receiver_user_profile_id: parseInt(receiver_user_profile_id),
    status: "pending",
    timestamp: null,
  });
  console.log(friendRequestData)
  
  const handleLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/profiles`);
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [API]);
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch(`${API}/allgoals`);
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const data = await response.json();
                setGoals(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchGoals();
    }, [API]);
    
    const filteredGoals = goals.filter(
        (goal) => goal.goal_id === parseInt(userprofile_id)
        );
        
        //   const filteredPics = profile.filter(
            //     (pic) => pic.userprofile_id === parseInt(userprofile_id)
            //   );
            
            const sendFriendRequest = () => {
                const formData = {
                    sender_user_profile_id: parseInt(user.userprofile_id),
                    receiver_user_profile_id: parseInt(userprofile_id),
      status: "pending",
    };

    fetch(`${API}/friendrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friendRequestData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="singleprofile-container">
      <div className="top-bar"></div>

      {profile && (
        <div>
          {profile
            .filter((el) => el.userprofile_id === parseInt(userprofile_id))
            .map((user, index) => (
              <div id={user.userprofile_id} key={index}>
                {/* <img src={`${user.profile_img}`}/> */}

                <div id="add-container">
                  <button id="profile-add" onClick={sendFriendRequest}>Add Friend</button>
                </div>
                <br></br>

                <img
                  id="single-pic"
                  src={user.gender === "Male" ? profilePic : profilePic2}
                />

                <h4>
                  {user.firstname} {user.lastname}
                </h4>
                <h6>{`@${user.username}`}</h6>
                <p>Gender: {user.gender}</p>
                <p>Age: {user.age}</p>
                <p id="bio">
                  Bio: <br />
                  {user.bio}
                </p>
              </div>
            ))}
        </div>
      )}

      <div className="stats">
        <div className="stat">
          <button
            className="css-button-3d--sky"
            id="profile-active"
            onClick={() => setSelectedGoals(false)}
          >
            Active Goals
          </button>
          <p>{/* Add number of friends */}</p>
        </div>
        <div className="stat">
          <h3></h3>
          <p>{/* Add number of completed goals */}</p>
        </div>
      </div>
      <div>
        {filteredGoals.map((goal) => (
          <div key={goal.goal_id}>
            <h4>{goal.title}</h4>
            <p>{goal.description}</p>
          </div>
        ))}
      </div>
      <div className="stat">
        <button
          className="css-button-3d--sand"
          onClick={() => setSelectedGoals(true)}
        >
          Completed Goals
        </button>
        <p>{/* Add number of posts */}</p>
      </div>
    </div>
  );
};

export default SingleProfile;
