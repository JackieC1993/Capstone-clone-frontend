import React from "react";
import { useState } from "react";
import "../App.css";

import JoinRoom from "../Pages/JoinRoom";


const HiveChat = () => {
  const [userOneChat, setUserOneChat] = useState("");
  const [userTwoChat, setUserTwoChat] = useState("");
  const [chatDialogue, setChatDialogue] = useState("");
  const [userOneButtonDisabled, setUserOneButtonDisabled] = useState(false);
  const [userTwoButtonDisabled, setUserTwoButtonDisabled] = useState(false);

  

  return (
    <>

        <div id="container">
          <div className="frame">
            <div className="div2">
              <header id="chat" className="header"><h1>HiveChat</h1></header>              
              <JoinRoom />
            </div>
   
        </div>
      </div>
    </>
  );
};

export default HiveChat;
