import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Post = ({ user, token, post }) => {
  const API = import.meta.env.VITE_BASE_URL;

  const usersWhoLiked = post.users_who_liked || [];
  const [likeCount, setLikeCount] = useState(usersWhoLiked.length);
  const [likeToggle, setLikeToggle] = useState(
    usersWhoLiked.includes(user.userprofile_id)
  );
  const [comments, setComments] = useState([]);

  //   const [liked, setLiked] = useState({
  //     userprofile_id: user.userprofile_id,
  //     post_id: post.post_id,
  //   });
  //   console.log({ likeToggle });

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

  const fetchComments = () => {
    fetch(`${API}/posts/${post.post_id}/comments`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setComments(res);
      })
      .catch((error) => console.log(error));
  };
  console.log("This is the comments array: ", comments);
  console.log(post.userprofile_id);
  useEffect(() => {
    fetchComments();
  }, []);

  //   console.log("This is the comments array: ",comments.map((com)=> console.log(com)));

  return (
    <div className="post">
      <Link
        to={`/feed/${post.post_id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="post_header">
          <img
            src={post.profile_img}
            alt={`${post.username}'s profile image`}
          />
          <h4 id="post_username">{post.username}</h4>
        </div>
        <div id="post_description" style={{ textAlign: "left" }}>
          {post.post_description}
        </div>
      </Link>
      <div className="post_footer">
        <FaCommentDots className="comment_icon" />{" "}
        <span className="count comments_">{comments.length}</span>
        {likeToggle ? (
          <AiFillLike
            onClick={handleClick}
            className="like_icon"
            style={{ color: "var(--GHGreen)" }}
          />
        ) : (
          <AiOutlineLike onClick={handleClick} className="like_icon" />
        )}
        <span className="count likes">{likeCount}</span>
      </div>
    </div>
  );
};

export default Post;
