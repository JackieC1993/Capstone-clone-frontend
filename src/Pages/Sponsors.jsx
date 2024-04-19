import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Sponsors.css"

//pics
import nike from "../assets/nike.jpg"
import Ubereats from "../assets/Ubereats.png";
import amazon from "../assets/amazon.png";
import google from "../assets/Google.png"; 
import starbucks from "../assets/starbucks.png";
import netflix from "../assets/netflix.png";
import apple from  "../assets/apple.png";
import mircosoft from "../assets/mircosoft.png";
import adidas from "../assets/adidas.png";
import cocacola from '../assets/cocacola.png';
import target from "../assets/target.png";
import samsung from "../assets/samsung.png";
import groupon from "../assets/groupon.png";
import walmart from "../assets/walmart.png";
import mcdonald from "../assets/mcdonald.png";
import bestbuy from "../assets/bestbuy.png";
import burgerking from "../assets/burgerking.png";
import uber from "../assets/uber.png";
import temu from "../assets/temu.png";
import crest from "../assets/crest.png";



const Sponsors = ({ user, token }) => {
    const API = import.meta.env.VITE_BASE_URL;
 
  const [goalsCompleted, setGoalsCompleted] = useState([]);


  const [isLoading, setIsLoading] = useState(true);
  const trueGoallength=goalsCompleted
  .filter((goal) => goal.userprofile_id === user.userprofile_id)

  const sponsors = [
    { company: 'Nike',image: `${nike}`, category: 'Shopping', discount: '$25 gift card ' },
    { company: 'Amazon', image: `${amazon}`, category: 'Shopping', discount: 'Free Prime membership' },
    { company: 'Google',image: `${google}`, category: 'Technology', discount: '$25 gift card' },
    { company: 'Starbucks',image: `${starbucks}`, category: 'Food & Beverage', discount: 'Free coffee for a month' },
    { company: 'Netflix',image: `${netflix}`, category: 'Entertainment', discount: '1 month free subscription' },
    { company: 'Apple',image: `${apple}`, category: 'Technology', discount: '$20 gift card' },
    
    { company: 'Microsoft',image: `${mircosoft}`, category: 'Technology', discount: '$10 gift card' },
    { company: 'Adidas',image: `${adidas}`, category: 'Shopping', discount: '$15 dollar gift card' },
    { company: 'Coca-Cola',image: `${cocacola}`, category: 'Food & Beverage', discount: 'Free soda for a month' },
    { company: 'Samsung',image: `${samsung}`, category: 'Technology', discount: '10% off Samsung products' },
    { company: 'Groupon',image: `${groupon}`, category: 'miscellaneous', discount: '10% off groupon items' },
    { company: 'Target',image: `${target}`, category: 'Shopping', discount: 'Free gift card' },
    { company: 'Walmart',image:`${walmart}`, category: 'Shopping', discount: 'Discounts on select items' },
    { company: 'McDonalds',image:`${mcdonald}`, category: 'Food & Beverage', discount: 'Free fries with purchase' },
    { company: 'Burger King',image:`${burgerking}`, category: 'Food & Beverage', discount: 'Buy one, get one free' },
    { company: 'BestBuy',image:`${bestbuy}`, category: 'Technology', discount: '10% percent of BestBuy products' },
    { company: 'UberEats', image: `${Ubereats}`, category: 'Food and Beverage', discount: '10% off Ubereats order' },
    { company: 'Uber',image: `${uber}`,category: 'Transportation', discount: 'Discounted rides' },
    { company: 'Temu',image: `${temu}`, category: 'Entertainment', discount: '50% off Temu items' },
    { company: 'Crest',image: `${crest}`,category: 'Hygenie', discount: '10% off Crest product' },
  ];

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  useEffect(() => {
    fetchCompletedGoals(); 
  }, []);

  const fetchCompletedGoals = async () => {
    try {
      const response = await axios.get(`${API}/allgoals`, { headers });
      const completedGoals = response.data;
      setGoalsCompleted(completedGoals);
      if(goalsCompleted.length>5){
            setIsLoading(false);
        
      }
    } catch (error) {
      console.log('Error fetching completed goals:', error);
    }
  };

  useEffect(() => {
    if (trueGoallength.length> 1) {
      setIsLoading(false);
    }
  }, [trueGoallength]);



  return (
    <div id="sponsor-container">


      
      <h2 className='goalcompleted'>Goals Completed</h2>
      {isLoading ? (
        <>
        <p>Loading...</p>
        <h1>Complete More goals to unlock offers!!!</h1>
        </>
      ) : (

            // <div className="completed">
        <ul>
                <br></br>
           
        {goalsCompleted
                    .filter((goal) => goal.userprofile_id === user.userprofile_id && goal.completed )
                    .map((goal, goalIndex) => (

                            <p id="prizes"key={goalIndex}>💯% {goal.description}</p>
                            ))}
        </ul>
                            // </div>
      )}

      {!isLoading  && (
          <>
       
          <ul className='results'>
          <h2 className='discountearned'>Discounts Earned</h2>
            <div className="honeycomb-container">
            {sponsors.map((sponsor, index) => (
              <li className="flashing-animation" key={index}>
                <div className='website-id'>
    <img id="sponsor-img"src={sponsor.image} alt={sponsor.company} />
<a className='websites' href= {`http://www.${sponsor.company}.com`}>{sponsor.company}</a>
                </div>
    <br>
    </br>
   
      {sponsor.company}: {sponsor.category} - {sponsor.discount}
   
  </li>
))}
        

            </div>
          </ul >       
         
            </>
      )}
    </div>
  );
};

export default Sponsors;