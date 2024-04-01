import React, { useState, useEffect } from "react";
import "./EditGoal.css";

const EditGoal = ({ user, token, goalID, onClose, onEdit }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [interests, setInterests] = useState([]);
  const [goalForm, setGoalForm] = useState({
    name: "",
    target_date: "",
    description: "",
    userprofile_id: user.userprofile_id,
    interest_id: user.interest_id,
  });
  console.log(goalForm);

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;

  //     setGoalForm((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  const handleInputChange = (event) => {
    setGoalForm({ ...goalForm, [event.target.id]: event.target.value });
  };

  // console.log(goalID)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(goalForm.target_date);
    fetch(`${API}/profiles/${user.userprofile_id}/goals/${goalID}`, {
      method: "PUT",
      body: JSON.stringify(goalForm),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setGoalForm(res);
        onEdit();
        onClose();
        // window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const getGoal = () => {
    fetch(`${API}/profiles/${user.userprofile_id}/goals/${goalID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setGoalForm(res);
        // console.log(res);
      })
      .catch((error) => console.log(error));
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

  useEffect(() => {
    getGoal();
    getInterests();
  }, []);
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <label htmlFor="name">Goal Name:</label>
        <input
          value={goalForm.name}
          onChange={handleInputChange}
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
          value={goalForm.interest_id}
          onChange={handleInputChange}
          id="interest_id"
          required
        >
          <option value="">Select an Interests</option>
          {interests.map(({ interest_id, name }) => {
            return (
              <option key={interest_id} value={interest_id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <br />

      <div className="form-field">
        <label htmlFor="tartgetDate">Target Date:</label>
        <br />
        <input
          type="date"
          value={goalForm.target_date.slice(0, 10)}
          onChange={handleInputChange}
          id="target_date"
          required
        />
      </div>

      <br />

      <div className="form-field">
        <label htmlFor="description">Goal Description:</label>
        <br />
        <textarea
          value={goalForm.description}
          onChange={handleInputChange}
          id="description"
        />
      </div>

      <br />

      <div className="form-buttons">
        <button type="submit">Submit</button>

        <button type="button" onClick={() => onClose()}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditGoal;
