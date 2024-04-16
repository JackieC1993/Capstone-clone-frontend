import React from "react";
import PostDetails from "../Components/PostDetails";

const ShowPost = ({ user, token }) => {
  return <PostDetails user={user} token={token} />;
};

export default ShowPost;
