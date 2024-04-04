import React from "react";
import { Link } from "react-router-dom";

const Post = ({ user, token, post }) => {
  return (
    <Link to={`/feed/${post.id}`} className="post">
      <div >
        <div className="post_header">
          <img
            src={post.profile_img}
            alt={`${post.username}'s profile image`}
          />
          <h4 id="post_username">{post.username}</h4>
        </div>
        <span id="post_description">{post.post_description}</span>
      </div>
    </Link>
  );
};

export default Post;
