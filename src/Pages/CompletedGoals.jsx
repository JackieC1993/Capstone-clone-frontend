import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../Components/GoalCard";
import CompletedGoalCard from "../Components/CompletedGoalCard";
import "./Goals.css";

const CompletedGoals = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [goals, setGoals] = useState([]);
  const [err, setError] = useState("");

  // console.log("The user obj", user);

  const fetchData = () => {
    fetch(`${API}/profiles/${user.userprofile_id}/goals`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setGoals(res);
      })
      .catch((err) => {
        setError(err.message);
        // setGoals(res);
      });
  };
  // console.log("The goals", goals);

  useEffect(() => {
    fetchData();
  }, []);
console.log(goals)
const filteredGoals = goals.filter((goal) => goal.completed);

return (
  <div className="goals-container">
    {filteredGoals.map((goal) => {
      return (
        <CompletedGoalCard key={goal.goal_id} onEdit={fetchData} user={user} token={token} goal={goal} />
      );
    })}
  </div>
);
};
export default CompletedGoals;
