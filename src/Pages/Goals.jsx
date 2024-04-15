import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../Components/GoalCard";
import "./Goals.css";

const Goals = ({ user, token, completed, active, selectedGoals }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [goals, setGoals] = useState([]);
  const [err, setError] = useState("");

  const [activeGoalId, setActiveGoalId] = useState(null);

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
        const activeGoals = res.filter(({ completed }) => !completed);
        const completedGoals = res.filter(({ completed }) => completed);
        console.log(completedGoals);
        const showGoals = active
          ? activeGoals
          : completed
          ? completedGoals
          : [];
        setGoals(showGoals);
      })
      .catch((err) => {
        setError(err.message);
        // setGoals(res);
      });
  };
  // console.log("The goals", goals);

  useEffect(() => {
    fetchData();
  }, [selectedGoals]);
  // console.log(goals);
  return (
    <div className="goals-container">
      {/* <h1>The Goals Page</h1> */}

      {goals.map((goal) => {
        return (
          <GoalCard
            key={goal.goal_id}
            onEdit={fetchData}
            user={user}
            token={token}
            goal={goal}
            goals={goals}
            setGoals={setGoals}
            completed={completed}
            activeGoalId={activeGoalId}
            setActiveGoalId={setActiveGoalId}
          />
        );
      })}
    </div>
  );
};

export default Goals;
