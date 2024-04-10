import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";
import "./GoalProfile.css";

const GoalProfile = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const [goals, setGoals] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [interests, setInterest] = useState([]);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelect, setUserSelect] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSelectChange = (event) => {
    setUserSelect(event.target.value);
  };

  useEffect(() => {
    console.log(API);
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/profiles`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`${API}/allgoals`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setGoals(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchGoals();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/interests`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setInterest(data);
        console.log("Interest");
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredUsers = allusers.filter((user) => {
      // If no interest is selected, return true to include all users
      if (!userSelect) return true;

      // Check if the user has the selected interest
      return interests.some(
        (interest) =>
          interest.interest_id === user.userprofile_id &&
          interest.name === userSelect
      );
    });

    setFilteredUsers(filteredUsers);
  }, [userSelect, interests, allusers]);

  const goToPreviousCard = () => {
    if (allusers.length === 0) {
      setCurrentIndex(0); // Reset to the first position
      return;
    }
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : allusers.length - 1
    );
  };

  const goToNextCard = () => {
    if (allusers.length === 0) {
      setCurrentIndex(0); // Reset to the first position
      return;
    }
    setCurrentIndex((prevIndex) =>
      prevIndex < allusers.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlers = useSwipeable({
    onSwipedUp: goToNextCard,
    onSwipedDown: goToPreviousCard,
  });

  const SwipeableComponent = () => {
    const hasUsers = filteredUsers.length > 0;

    return (
      <div className="carousel" {...(hasUsers ? handlers : {})}>
        {filteredUsers.map((user, index) => {
          const isCurrentCard = index === currentIndex;
          const path = `/profile/${user.userprofile_id}`;
          return (
            <div
              className={`user-card${isCurrentCard ? " active" : ""}`}
              key={index}
              {...(hasUsers ? handlers : {})}
            >
              <div className="tbg">
                <div className="tbgwrap">
                  {/* <TiArrowSortedUp className="uparrow" /> */}

                  <Link to={path}>
                    <div className="tphoto">
                      <img
                        src={user.profile_img}
                        title="tphoto"
                        alt="Tinder Photo"
                      />
                      <div className="tname">
                        <h1>{user.username}</h1>{" "}
                        <span className="age">
                          <h3>Age: {user.age}</h3>
                        </span>
                        {goals
                          .filter(
                            (goal) => goal.goal_id === user.userprofile_id
                          )
                          .map((goal, goalIndex) => (
                            <p key={goalIndex}> Goal: {goal.description}</p>
                          ))}
                        {interests
                          .filter(
                            (interest) =>
                              interest.interest_id === user.userprofile_id
                          )
                          .map((interest, interestIndex) => (
                            <p key={interestIndex}>
                              {" "}
                              Interest: {interest.name}
                            </p>
                          ))}
                      </div>
                    </div>
                  </Link>
                  <div className="tcontrols">
                    <div className="tno">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                    {/* <TiArrowSortedDown className="downarrow" /> */}
                    <div className="tyes">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
                <div className="credit">
                  <a href="http://themakery.jcink.net"></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="carousel-container" {...handlers}>
        <h2>Find a Buddy</h2>
        <form>
          <label>Find others that share your interest.</label>
          <select
            className="carousel-select"
            name="interests"
            onChange={handleSelectChange}
            value={userSelect}
          >
            <option value="">
              Select an interest here <Link to="/ =>"> =&gt;</Link>
            </option>

            <option value="Tech"> Tech</option>
            <option value="Hiking">Hiking</option>
            <option value="Photography">Photography</option>
            <option value="Gardening">Gardening</option>
            <option value="Traveling">Traveling</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Finance">Finance</option>
            <option value="Crypto">Crypto</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
          </select>
        </form>
        <SwipeableComponent />
      </div>
    </>
  );
};

export default GoalProfile;
