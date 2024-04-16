import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostDetails.css";

const PostDetails = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [post, setPost] = useState({ comments: [] });
  const { index } = useParams();

  const fetchData = () => {
    fetch(`${API}/posts/${index}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPost(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log("One individual post: ", post);

  const comments = post.comments.map((comment) => (
    <div key={comment.comment_id} className="comment">
      <span>{comment.description}</span>
    </div>
  ));
  //   console.log(comments[0]);
  //   console.log(comments);
  return (
    <div className="post_details">
      <div className="upper-post">
        <div className="post-header">
          <img
            src={post.profile_img}
            alt={`${post.username}'s profile image`}
          />
          <h4>{post.username}</h4>
        </div>

        <span id="post-body">{post.post_description}</span>
      </div>

      <div className="comments">{comments}</div>
    </div>
  );
};

export default PostDetails;
