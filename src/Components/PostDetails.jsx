import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetails = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [post, setPost] = useState([]);
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

  console.log("One individual post: ", post);

  return (
    <div>
      <h1>The Post Details!</h1>
    </div>
  );
};

export default PostDetails;
