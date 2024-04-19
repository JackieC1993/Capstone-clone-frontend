// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import GoalCard from "../Components/GoalCard";
// import "./Goals.css";

// const Goals = ({ user, token, completed, active, selectedGoals }) => {
//   const API = import.meta.env.VITE_BASE_URL;
//   const [goals, setGoals] = useState([]);
//   const [err, setError] = useState("");

//   const [activeGoalId, setActiveGoalId] = useState(null);

//   // console.log("The user obj", user);

//   const fetchData = () => {
//     fetch(`${API}/profiles/${user.userprofile_id}/goals`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         // console.log(res);
//         const activeGoals = res.filter(({ completed }) => !completed);
//         const completedGoals = res.filter(({ completed }) => completed);
//         console.log(completedGoals);
//         const showGoals = active
//           ? activeGoals
//           : completed
//           ? completedGoals
//           : [];
//         setGoals(showGoals);
//       })
//       .catch((err) => {
//         setError(err.message);
//         // setGoals(res);
//       });
//   };
//   // console.log("The goals", goals);

//   useEffect(() => {
//     fetchData();
//   }, [selectedGoals]);
//   // console.log(goals);
//   return (
//     <div className="goals-container">
//       {/* <h1>The Goals Page</h1> */}

//       {goals.map((goal) => {
//         return (
//           <GoalCard
//             key={goal.goal_id}
//             onEdit={fetchData}
//             user={user}
//             token={token}
//             goal={goal}
//             goals={goals}
//             setGoals={setGoals}
//             completed={completed}
//             activeGoalId={activeGoalId}
//             setActiveGoalId={setActiveGoalId}
//           />
//         );
//       })}
//     </div>
//   );
// };
// export default Goals;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoalCard from "../Components/GoalCard";

import "./Goals.css";

const Goals = ({ user, token }) => {
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
const filteredGoals = goals.filter((goal) => !goal.completed);



const addProgress = (goalId) => {
  fetch(`${API}/goals/${goalId}/progress`, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      
      window.location.reload();
      console.log(res);
    })
    .catch((err) => console.log(err));
};


return (
  <div className="goals-container">
        <h3>
          Goal Progress: {`${goals.filter((goal) => goal.completed).length}/${goals.length} Complete`}
        </h3>
    {filteredGoals.map((goal) => {
      {/* {goals.map((goal) => { */}
      return (
        <>
        {/* <div key={goal.id}> */}
        <GoalCard key={goal.goal_id} onEdit={fetchData} user={user} token={token} goal={goal} />
         
              <br></br>
          <br></br>
        
      <div>
      </div>
        </>
      );
    })}
       
  </div>
  
);
};
export default Goals;