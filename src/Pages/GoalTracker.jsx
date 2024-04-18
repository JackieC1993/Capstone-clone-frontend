import React, { useState, useEffect } from 'react';
import '../Pages/Goals.css';

const GoalTracker = ({ user, token, markGoalAsCompleted }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [goals, setGoals] = useState([]);
  const [err, setError] = useState('');
  const [trueProgress, setTrueProgress] = useState('');

  const fetchData = () => {
    fetch(`${API}/profiles/${user.userprofile_id}/goals`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGoals(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem('goalProgress');
    if (savedProgress) {
      setTrueProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('goalProgress', JSON.stringify(goals));
  }, [goals]);

  const filteredGoals = goals
    .filter((goal) => !goal.completed)
    .reduce((uniqueGoals, goal) => {
      const existingGoal = uniqueGoals.find((g) => g.id === goal.id);
      if (!existingGoal) {
        uniqueGoals.push(goal);
      }
      return uniqueGoals;
    }, []);

  const handleAddProgress = (goalId) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId && goal.progress < 100) {
        const updatedGoal = { ...goal, progress: goal.progress + 25 };
        if (updatedGoal.progress >= 100 && !updatedGoal.completed) {
          updatedGoal.completed = true;
          markGoalAsCompleted(goal.goal_id);
        }
        return updatedGoal;
      }
      return goal;
    });

    setGoals(updatedGoals);

    // PATCH request to update the progress
    fetch(`${API}/profiles/${user.userprofile_id}/goals/${goalId}/progress`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ progress: updatedGoals.find((g) => g.id === goalId).progress }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Handle successful response if needed
      })
      .catch((err) => {
        // Handle error if needed
      });
  };

  return (
    <div className="goals-container">
      {filteredGoals.map((goal) => (
        <div key={goal.id}>
          <div className="progress-container">
            <div className={`progress-box ${goal.progress >= 25 ? 'checked' : ''}`}></div>
            <div className={`progress-box ${goal.progress >= 50 ? 'checked' : ''}`}></div>
            <div className={`progress-box ${goal.progress >= 75 ? 'checked' : ''}`}></div>
            <div className={`progress-box ${goal.progress >= 100 ? 'checked animate' : ''}`}></div>
          </div>
          <p>Progress: {goal.progress}%</p>
          <p>Completed: {goal.completed ? 'Yes' : 'No'}</p>
          <button className='addprogress' onClick={() => handleAddProgress(goal.id)}>Add Progress</button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default GoalTracker;