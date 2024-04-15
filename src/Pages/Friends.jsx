// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "../Pages/Friends.css";
// const FriendRequest = ({ setUser, token, user, setToken }) => {
//   const API = import.meta.env.VITE_BASE_URL;
//   let userprofile_id = user.userprofile_id;
//   const receiver_user_profile_id = parseInt(userprofile_id);
//   const [friendRequest, setFriendRequest] = useState([]);
//   const [acceptFriend, setAcceptedFriend] = useState([]);
//   const [formData, setFormData] = useState({
//     sender_user_profile_id: parseInt(userprofile_id),
//     receiver_user_profile_id: parseInt(receiver_user_profile_id),
//     status: "accepted",
//   });
//   const acceptFriendRequest = (requestId, senderId) => {
//     const updatedFriendRequest = friendRequest.map((request) => {
//       if (request.id === requestId) {
//         return { ...request, status: "accepted" };
//       }
//       return request;
//     });
//     const updatedFriendRequestData = {
//       sender_user_profile_id: senderId,
//       receiver_user_profile_id: receiver_user_profile_id,
//       status: "accepted",
//     };
//     fetch(`${API}/profiles/${receiver_user_profile_id}/connections/${senderId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedFriendRequestData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setFriendRequest(updatedFriendRequest);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const denyFriendRequest = (requestId, senderId) => {
//     const updatedFriendRequest = friendRequest.map((request) => {
//       if (request.id === requestId) {
//         return { ...request, status: "denied" };
//       }
//       return request;
//     });
//     const updatedFriendRequestData = {
//       sender_user_profile_id: senderId,
//       receiver_user_profile_id: receiver_user_profile_id,
//       status: "denied",
//     };
//     fetch(`${API}/profiles/${receiver_user_profile_id}/connections/${senderId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedFriendRequestData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setFriendRequest(updatedFriendRequest);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const handleFormChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };
//   useEffect(() => {
//     const fetchFriendRequests = async () => {
//       try {
//         const response = await fetch(
//           `${API}/profiles/${receiver_user_profile_id}/connections/`
//         );
//         if (!response.ok) {
//           throw new Error(`Request failed with status: ${response.status}`);
//         }
//         const data = await response.json();
//         setFriendRequest(data);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };
//     fetchFriendRequests();
//   }, [receiver_user_profile_id]);
//   useEffect(() => {
//     const fetchFriendRequests = async () => {
//       try {
//         const response = await fetch(
//           `${API}/profiles/${receiver_user_profile_id}/connections/accepted`
//         );
//         if (!response.ok) {
//           throw new Error(`Request failed with status: ${response.status}`);
//         }
//         const data = await response.json();
//         setAcceptedFriend(data);
//         console.log(acceptFriend);
//         console.log(data);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };
//     fetchFriendRequests();
//   }, [receiver_user_profile_id]);
//   return (
//     <>
//       <div className="friendrequests-container">
//         <h3>Friend Request</h3>
//         {friendRequest.map((request) => (
//           <div id="request" key={request.id}>
//             <p>
//               <img className="request-photo" src={request.profile_img} alt="Profile" />
//               <h2>{request.username} sent you a friend request.</h2>
//             </p>
//             <p>
//               <button
//                 id="accept"
//                 onClick={() => acceptFriendRequest(request.id, request.userprofile_id)}
//               >
//                 :white_check_mark: Accept
//               </button>{" "}
//               <br />
//               <button id="decline"
//                onClick={() => denyFriendRequest(request.id, request.userprofile_id)}
//               >:x: Decline</button>
//             </p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h3>Friends Lists</h3>
//         {acceptFriend.map((accepted) => (
//           <div id="request" key={accepted.id}>
//             <p>
//               <img className="request-photo" src={accepted.profile_img} alt="Profile" />
//               <h2>{accepted.username}</h2>
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
// export default FriendRequest;
