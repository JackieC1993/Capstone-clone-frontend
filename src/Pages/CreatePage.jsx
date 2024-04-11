import React from "react";
import { Link } from "react-router-dom";
import "./CreatePage.css";

const CreatePage = () => {
  return (
    <div className="create_page">
      <div className="create_button">
        <Link to={"/goals/new"}>
          <button id="create-button">New Goal</button>
        </Link>
      </div>
      <div className="create_button">
        <Link to={"/posts/new"}>
          <button id="create-button">New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePage;
