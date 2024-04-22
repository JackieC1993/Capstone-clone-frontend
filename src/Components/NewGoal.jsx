import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./newGoal.css";

const NewGoal = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [goal, setGoal] = useState({
    name: "",
    target_date: "",
    description: "",
    completed: false,
    userprofile_id: user.userprofile_id,
    interest_id: user.interest_id,
    progress:0
  });

  const addGoal = () => {
    try {
      fetch(`${API}/profiles/${user.userprofile_id}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(goal),
      })
        .then((res) => res.json())
        .then(() => navigate("/userProfile"));
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getInterests = () => {
    fetch(`${API}/interests`)
      .then((res) => res.json())
      .then((res) => {
        setInterests(res);
        // console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const handleTextChange = (event) => {
    setGoal({ ...goal, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addGoal();
  };

  useEffect(() => {
    getInterests();
  }, []);
  console.log(goal);
  return (
    <div className="new-goal-container">
      <h4>Create a new goal:</h4>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-field">
          <label htmlFor="name">Goal Name:</label>
          <br />
          <input
            value={`Master Python in 10 months:🐍`||goal.name}
            onChange={handleTextChange}
            type="text"
            id="name"
            placeholder="Name Your Goal"
            required
          />
        </div>
        <br />
        <div className="form-field">
          <label htmlFor="interests">Select an Interest:</label>
          <br />
          <select
            value={interests.interest_id}
            onChange={handleTextChange}
            id="interest_id"
            required
          >
            <option value="">Select an Interests</option>
            {interests.map(({ interest_id, name }) => {
              return <option value={interest_id}>{name}</option>;
            })}
          </select>
        </div>
        <br />
        <div  id="target-date"className="form-field">
          <label htmlFor="tartgetDate">Target Date:</label>
          <br />
          <input
            type="date"
            value={goal.target_date}
            onChange={handleTextChange}
            id="target_date"
            required
          />
        </div>
        <br />
        <div className="form-field">
          <label htmlFor="description">Goal Description:</label>
          <br />
          <textarea
            value={`Master python within 10 months starting with basics, learning syntax, data structures, OOP, libraries.Progress will be tracked through completing online courses, tutorials, and monthly projects, with daily dedication to learning and practicing Python. And engage with the community
            `||goal.description}
            onChange={handleTextChange}
            id="description"
            rows="4"
          />
        </div>
        <br />
        <br />
        <button className="css-button-3d--green" type="submit">
          Create Goal
        </button>
      </form>
    </div>
  );
};

export default NewGoal;
