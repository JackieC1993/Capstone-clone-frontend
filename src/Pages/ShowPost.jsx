import React from "react";
import PostDetails from "../Components/PostDetails";

const ShowPost = ({user, token}) => {
  return (
    <div>
      <h2>Show Page</h2>
      <PostDetails user={user} token={token} />
    </div>
  );
};

export default ShowPost;
