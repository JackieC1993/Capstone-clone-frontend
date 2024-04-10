import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  const comments = post.comments.map((comment) => {
    // return comment;
    return comment;
  });
  //   console.log(comments[0]);
  //   console.log(comments);
  return (
    <div className="post_details">
      <div>
        <img src={post.profile_img} alt={`${post.username}'s profile image`} />
        <h4>{post.username}</h4>
      </div>
      <span>{post.post_description}</span>
      <div className="comments">
        <br />
        {comments.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <br />
            <span>{comment.description}</span>
            {/* {console.log(comment)} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
