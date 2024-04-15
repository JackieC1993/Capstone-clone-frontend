import React, { useState } from "react";
import EditGoal from "../Components/EditGoal";

const GoalCard = ({ user, token, goal, onEdit }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [editGoal, setEditGoal] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState(false);

  const onCancel = () => {
    setEditGoal(false);
  };

  const handleDelete = (goalId) => {
    console.log(goalId);
    fetch(`${API}/profiles/${user.userprofile_id}/goals/${goalId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        onEdit();
        // window.location.reload();
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const markGoalAsCompleted = (goalId) => {
    fetch(`${API}/profiles/${user.userprofile_id}/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        onEdit();
        window.location.reload();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  if (editGoal) {
    return (
      <EditGoal
        onEdit={onEdit}
        onClose={onCancel}
        user={user}
        token={token}
        goalID={goal.goal_id}
      />
    );
  }

  return (
    <div
      className={!expandedGoal ? "goalcard" : "goalcard goal-expand"}
      onClick={() => {
        setExpandedGoal(!expandedGoal);
      }}
    >
      <div className="goalcard-header">
        <h6>
          <strong>{goal.name}</strong>
        </h6>
        <span>Target Date: {goal.target_date.slice(0, 10)}</span>
      </div>
      <p>{goal.description}</p>

      <div className="goalcard-buttons">
        <button onClick={() => setEditGoal(true)}>📝</button>
        <button onClick={() => markGoalAsCompleted(goal.goal_id)}>
          ✅
        </button>
        <button
          type="button"
          onClick={() => {
            handleDelete(goal.goal_id);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default GoalCard;