import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    post_img: "null",
    post_description: "",
    userprofile_id: user.userprofile_id,
  });

  console.log(user);

  const addPost = () => {
    fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate("/")
      })
      .catch((error) => console.log(error));
  };

  const handleTextChange = (event) => {
    setNewPost({ ...newPost, [event.target.id]: event.target.value });
  };

  const handeSubmit = (event) => {
    event.preventDefault();
    addPost();
  };

  console.log(newPost);
  return (
    <div className="new-post-container">
      <h1>New Post Component</h1>
      <form onSubmit={handeSubmit}>
        <label htmlFor="post_description">Make a Post</label>
        <br />
        <textarea
          placeholder="What's happening"
          value={newPost.post_description}
          onChange={handleTextChange}
          id="post_description"
        />
        <button className="" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
