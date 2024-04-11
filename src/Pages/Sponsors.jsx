import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../Pages/Sponsors.css"

const Sponsors = ({ user, token }) => {
  const { userprofile_id } = useParams();
  const [goalsCompleted, setGoalsCompleted] = useState([]);
  const [discountsEarned, setDiscountsEarned] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const trueGoallength=goalsCompleted
  .filter((goal) => goal.userprofile_id === user.userprofile_id)

  const sponsors = [
    { company: 'Nike', category: 'Shopping', discount: '10% off membership' },
    { company: 'Amazon', category: 'Shopping', discount: 'Free Prime membership' },
    { company: 'Google', category: 'Technology', discount: '20% off Google products' },
    { company: 'Starbucks', category: 'Food & Beverage', discount: 'Free coffee for a month' },
    { company: 'Netflix', category: 'Entertainment', discount: '1 month free subscription' },
    { company: 'Apple', category: 'Technology', discount: 'Special pricing on Apple products' },
    
    { company: 'Microsoft', category: 'Technology', discount: '10% off Microsoft products' },
    { company: 'Adidas', category: 'Shopping', discount: '15% off membership' },
    { company: 'Coca-Cola', category: 'Food & Beverage', discount: 'Free soda for a month' },
    { company: 'Samsung', category: 'Technology', discount: '20% off Samsung products' },
    { company: 'Sony', category: 'Entertainment', discount: '10% off Sony products' },
    { company: 'Target', category: 'Shopping', discount: 'Free gift card' },
    { company: 'Walmart', category: 'Shopping', discount: 'Discounts on select items' },
    { company: 'McDonalds', category: 'Food & Beverage', discount: 'Free fries with purchase' },
    { company: 'Burger King', category: 'Food & Beverage', discount: 'Buy one, get one free' },
    { company: 'HP', category: 'Technology', discount: 'Special pricing on HP products' },
    { company: 'Canon', category: 'Technology', discount: '15% off Canon products' },
    { company: 'Uber', category: 'Transportation', discount: 'Discounted rides' },
    { company: 'Lyft', category: 'Transportation', discount: '10% off Lyft rides' },
  ];

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  useEffect(() => {
    fetchCompletedGoals(); // Fetch completed goals when the component mounts
  }, []);

  const fetchCompletedGoals = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/allgoals`, { headers });
      const completedGoals = response.data;
      setGoalsCompleted(completedGoals);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching completed goals:', error);
    }
  };

  const handleGoalCompletion = async () => {
    try {
      const goalId = Math.floor(Math.random() * 1000); // Generate a random goal ID
      if (!goalsCompleted.includes(goalId)) {
        // Perform the logic for completing the goal
        // ...
        const completedGoals = [...goalsCompleted, goalId];
        setGoalsCompleted(completedGoals);
        if (completedGoals.length > 10) {
          const discount = getDiscountFromSponsorCompany();
          setDiscountsEarned([...discountsEarned, discount]);
        }
      }
    } catch (error) {
      console.log('Error completing goal:', error);
    }
  };

  const getDiscountFromSponsorCompany = () => {
    const randomIndex = Math.floor(Math.random() * sponsors.length);
    return sponsors[randomIndex];
  };

  return (
    <div id="sponsor-container">
      {/* <h1>Goal Tracker</h1> */}
      {/* <button onClick={handleGoalCompletion}>Complete Goal</button> */}
      <h2>Goals Completed</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
        {goalsCompleted
                    .filter((goal) => goal.userprofile_id === user.userprofile_id)
                    .map((goal, goalIndex) => (
                      <p id="prizes"key={goalIndex}>💯% {goal.description}</p>
                    ))}
        </ul>
      )}
      {trueGoallength.length > 1 && (
        <div className='discount'>
          <h2>Discounts Earned</h2>
          <ul>
            <div className="honeycomb-container">
            {sponsors.map((discount, index) => (
              <li className="flashing-animation" key={index}>
                {discount.company}: {discount.category} - {discount.discount}

              </li>
            ))}

            </div>
          </ul >       </div>
      )}
    </div>
  );
};

export default Sponsors;