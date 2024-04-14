// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import Goals from "./Goals";
// import profilePic from "../assets/profile-male-blue.png";
// import friend from "../assets/friends.png"
// import sponsorpic from "../assets/sponsor.png"
// import { FaPlusCircle } from "react-icons/fa";
// import "./UserProfile.css";

// const UserProfile = ({ setUser, setToken, user, token }) => {
//   const API = import.meta.env.VITE_BASE_URL;
//   const navigate = useNavigate();
//   const [profiles, setProfiles] = useState({});
//   const [selectedGoals, setSelectedGoals] = useState(false);

//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const fetchData = () => {
//     try {
//       fetch(`${API}/profiles/${user.userprofile_id}`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           setProfiles(res);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="userprofile-container">
//       <div className="userprofile-picture">
//         <img id="userprofile-image" src={profilePic} alt="Profile Image" />
//       </div>
//       <div className="userprofile-header">
//         <h4>
//           {profiles.firstname} {profiles.lastname}
//         </h4>
//         <h6>
//           {`@${profiles.username}`}
//           <br />
//           <br />
//           Age: {profiles.age}
//           <br />
//           Gender: {profiles.gender}
//         </h6>
//       </div>
//       <div className="logout-friend-container">
//         <div className="logout-button">
//           <Button
//             className="lg-button"
//             onClick={handleLogout}
//             style={{ color: "white" }}
//           >
//             Log Out
//           </Button>
//         </div>
//         <div className="friend-div">
//           <Link to="/friendrequests">
//           <img className="friends" src={friend} alt="Friends Icon" />
//           </Link>
//           <h6 className="friendname">Friends</h6>
//         </div>
//       </div>
//       <div className="bio">
//         <div className="bio-wrapper">
//           <p className="bold" style={{ color: "white" }}>
//             Bio:
//           </p>
//           <p className="ital-bio">{profiles.bio}</p>
//         </div>
//       </div>
//       <div className="active">
//         <button
//           className="css-button-3d--sky"
//           onClick={() => setSelectedGoals(false)}
//           >
//           Active Goals
//         </button>
//       <Link to="/goals/new" className="newgoal-button">
//         <FaPlusCircle className="newgoal-icon" />
//       </Link>
//       <div className="Sponsors">
//         <Link to="/sponsors/">
//           <img id="sponsoricon" src={sponsorpic}/>
//         </Link>
//       </div>
//       </div>

//       <div className="completed">
//         <button
//           className="css-button-3d--sand"
//           onClick={() => setSelectedGoals(true)}
//           >
//           Completed
//         </button>
//           {!selectedGoals ? (
//             <div>
//               <Goals  user={user} token={token} />
    
//             </div>
//           ) : (
//             <span>List of Completed Goals</span>
//           )}
//       </div>
 



  
//       {/* <Link className="connectfriends" to="/friendrequests"></Link> */}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./UserProfile.css";
import Goals from "./Goals";
import CompletedGoals from "./CompletedGoals";
import profilePic from "../assets/profile-male-blue.png";
import friend from "../assets/friends.png"
import sponsorpic from "../assets/sponsor.png"
import { FaPlusCircle } from "react-icons/fa";

const UserProfile = ({ setUser, setToken, user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState({});
  const [selectedGoals, setSelectedGoals] = useState(false);

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
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="logout-friend-container">
        <div className="logout-button">
          <Button
            className="lg-button"
            onClick={handleLogout}
            style={{ color: "white" }}
          >
            Log Out
          </Button>
        </div>
        <div className="friend-div">
          <Link to="/friendrequests">
          <img className="friends" src={friend} alt="Friends Icon" />
          </Link>
          <h6 className="friendname">Friends</h6>
        </div>
      <br></br>
      </div>
      <div className="bio">
        <div className="bio-wrapper">
          <p className="bold" style={{ color: "white" }}>
            Bio:
          </p>
          <p className="ital-bio">{profiles.bio}</p>
        </div>
      </div>
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
      {/* <div className="button-container"> */}
      {/* </div> */}
   


      {!selectedGoals ? (
  
          <>
          <div id="create-new">
      <Link id="create-new"to="/goals/new" className="newgoal-button">
        <FaPlusCircle className="newgoal-icon" />
      </Link>

          </div>
          <Goals user={user} token={token} />
          
          </>


  
      ) : (
        <>
        
        <div>

            <span>List of Completed Goals</span>
            <CompletedGoals user={user} token={token}/>


        </div>
        <br></br>
        <div className="sponsor-div">
        <label>
          <strong><h3>Sponsors</h3></strong>

          <Link to="/sponsors/">
              <img  src={sponsorpic}/>
            </Link>
        </label>
        



        </div>
        </>
      )}
  
        
      {/* <Link className="connectfriends" to="/friendrequests"></Link> */}
    </div>
  );
};

export default UserProfile;