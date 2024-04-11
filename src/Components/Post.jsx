import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Post = ({ user, token, post }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [likeCount, setLikeCount] = useState(post.users_who_liked);
  const [likeToggle, setLikeToggle] = useState(false);
  const [liked, setLiked] = useState({
    userprofile_id: user.userprofile_id,
    post_id: post.post_id,
  });

  const handleClick = () => {
    // Toggle liked state
    // setLiked(!liked);

    fetch(`${API}/posts/like`, {
      method: "POST",
      body: JSON.stringify(liked),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLiked(res);
      })
      .catch((error) => console.log(error));
  };

  // console.log(user);
  // console.log(post);
  //   console.log(post.users_who_liked);
  //   console.log(likeCount);
  console.log(liked);
  return (
    <div className="post">
      <div className="post_header">
        <img src={post.profile_img} alt={`${post.username}'s profile image`} />
        <h4 id="post_username">{post.username}</h4>
      </div>
      <div id="post_description" style={{ textAlign: "left" }}>
        {post.post_description}
      </div>
      <div>
        <FaCommentDots /> <span></span>
        <AiOutlineLike onClick={handleClick} />{" "}
        <span>{likeCount ? likeCount.length : 0}</span>
      </div>
      <Link to={`/feed/${post.post_id}`}></Link>
    </div>
  );
};

export default Post;
