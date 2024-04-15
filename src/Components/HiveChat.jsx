// import React from "react";
// import button1 from "../assets/navbutton.png";
// // import user2 from "../assets/user2.png"
// import { useState, useEffect } from "react";
// import "./hiveChat.css";
// import Progress from "../Components/ProgressBar";
// import Progress2 from "../Components/ProgressBar2";
// import JoinRoom from "../Pages/JoinRoom";

// const user1 = {
//   id: "123456789",
//   name: "Alice",
//   email: "alice@example.com",
//   photoUrl: "https://talkjs.com/images/avatar-1.jpg",
//   welcomeMessage: "Hey there! How are you? :-)",
//   role: "default",
// };

// const user2 = {
//   id: "987654321",
//   name: "Sebastian",
//   email: "Sebastian@example.com",
//   photoUrl: "https://talkjs.com/images/avatar-5.jpg",
//   welcomeMessage: "Hey, how can I help? https://google.com",
//   role: "default",
// };
// const HiveChat = () => {
//   const [userOneChat, setUserOneChat] = useState("");
//   const [userTwoChat, setUserTwoChat] = useState("");
//   const [chatDialogue, setChatDialogue] = useState("");
//   const [userOneButtonDisabled, setUserOneButtonDisabled] = useState(false);
//   const [userTwoButtonDisabled, setUserTwoButtonDisabled] = useState(false);

//   // useEffect(() => {
//   //   const storedChatDialogue = localStorage.getItem("chatDialogue");
//   //   if (storedChatDialogue) {
//   //     setChatDialogue(storedChatDialogue);
//   //   }
//   // }, []);

//   // const updateChatDialogue = (newChatDialogue) => {
//   //   setChatDialogue(newChatDialogue);
//   //   localStorage.setItem("chatDialogue", newChatDialogue);
//   // };

//   // const handleSendUserOneChat = (e) => {
//   //   e.preventDefault();
//   //   if (userOneChat.trim() !== "") {
//   //     const updatedChatDialogue = `${chatDialogue}${user1.name}: ${userOneChat}\n`;
//   //     updateChatDialogue(updatedChatDialogue);
//   //     setUserOneChat("");
//   //     setUserOneButtonDisabled(true);
//   //     setTimeout(() => {
//   //       setUserOneButtonDisabled(false);
//   //     }, 500);
//   //   }
//   // };

//   // const handleSendUserTwoChat = (e) => {
//   //   e.preventDefault();
//   //   if (userTwoChat.trim() !== "") {
//   //     const updatedChatDialogue = `${chatDialogue}${user2.name}: ${userTwoChat}\n`;
//   //     updateChatDialogue(updatedChatDialogue);
//   //     setUserTwoChat("");
//   //     setUserTwoButtonDisabled(true);
//   //     setTimeout(() => {
//   //       setUserTwoButtonDisabled(false);
//   //     }, 500);
//   //   }
//   // };

//   // const formatChatDialogue = () => {
//   //   return chatDialogue.split("\n").map((message, index) => {
//   //     if (message.startsWith(`${user1.name}`)) {
//   //       return (
//   //         <p key={index} className="user1-message">
//   //           {message}
//   //         </p>
//   //       );
//   //     } else if (message.startsWith(`${user2.name}`)) {
//   //       return (
//   //         <p key={index} className="user2-message">
//   //           {message}
//   //         </p>
//   //       );
//   //     }
//   //     return null;
//   //   });
//   // };

//   return (
//     <>
//       <div>
//         <div id="container">
//           <div className="frame">
//             <div className="div2">
//               <header id="chat" className="header"></header>
//               <Progress id="user1-goal" />
//               <JoinRoom />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HiveChat;
