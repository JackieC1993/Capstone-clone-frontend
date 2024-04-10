import React from "react";
import { Link } from "react-router-dom";
import NewGoal from "../Components/NewGoal";

const CreatePage = () => {
  return (
    <div className="create_page">
      <Link to={"/goals/new"}>
        <button>New Goal</button>
      </Link>
      <br />
      <Link to={"/posts/new"}>
        <button>New Post</button>
      </Link>
    </div>
  );
};

export default CreatePage;
