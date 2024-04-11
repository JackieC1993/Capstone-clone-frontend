import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3001"); // Replace with your server URL

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input type="text" placeholder="Type your message" />
      <button onClick={() => sendMessage("Hello!")}>Send</button>
    </div>
  );
};

export default ChatComponent;
