import { useState, useEffect } from "react";
import Post from "../Components/Post";
import "./Feed.css"

const Feed = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [feed, setFeed] = useState([]);

  const fetchData = () => {
    fetch(`${API}/posts`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setFeed(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("This is the feed array: ", feed);
  // console.log(user)
  return (
    <div className="feed">
      {/* <h2>This is the feed</h2> */}

      {feed.map((posts) => {
        return (
          <Post key={posts.post_id} user={user} token={token} post={posts}/>
        );
      })}
    </div>
  );
};

export default Feed;
