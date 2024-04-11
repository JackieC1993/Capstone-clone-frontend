import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Post = ({ user, token, post }) => {
  const usersWhoLiked = post.users_who_liked || [];
  const API = import.meta.env.VITE_BASE_URL;
  const [likeCount, setLikeCount] = useState(usersWhoLiked.length);
  const [likeToggle, setLikeToggle] = useState(
    usersWhoLiked.includes(user.userprofile_id)
  );
  //   const [liked, setLiked] = useState({
  //     userprofile_id: user.userprofile_id,
  //     post_id: post.post_id,
  //   });

  console.log({ likeToggle });

  const handleClick = () => {
    // Toggle liked state
    // setLikeToggle(!likeToggle);
    setLikeToggle((prev) => !prev);

    if (likeToggle) {
      //   setLikeCount(likeCount - 1);
      setLikeCount((prev) => prev - 1);
    } else {
      //   setLikeCount(likeCount + 1);
      setLikeCount((prev) => prev + 1);
    }

    fetch(`${API}/posts/${likeToggle ? "unlike" : "like"}`, {
      method: `${likeToggle ? "DELETE" : "POST"}`,
      body: JSON.stringify({
        userprofile_id: user.userprofile_id,
        post_id: post.post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  // console.log(user);
  // console.log(post);
  //   console.log(post.users_who_liked);
  //   console.log(likeCount);
  console.log(likeToggle);
  return (
    <div className="post">
      <div className="post_header">
        <img src={post.profile_img} alt={`${post.username}'s profile image`} />
        <h4 id="post_username">{post.username}</h4>
      </div>
      <span id="post_description">{post.post_description}</span>
      <br />
      <div>
        <FaCommentDots /> <span></span>
        {likeToggle ? (
          <AiFillLike onClick={handleClick} />
        ) : (
          <AiOutlineLike onClick={handleClick} />
        )}
        <span>{likeCount}</span>
      </div>
      <Link to={`/feed/${post.post_id}`}></Link>
    </div>
  );
};

export default Post;
