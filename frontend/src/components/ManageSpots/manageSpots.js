import React, { useEffect, useState } from "react";
import { currUserSpots } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DeleteSpot } from "../DeleteSpot/deletespot";
import OpenModalButton, { openModal } from "../OpenModalButton/index";
import "./ManageSpots.css";
import SpotDetail from "../SpotDetails/SpotDetails";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spot?.allUserSpots));
  // const userSpots = useSelector((State) => State.spot.allUserSpots);
  // const spots = Object.values(userSpots);
  console.log("here", spots);
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(currUserSpots());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div>
        <div>User must be logged in.</div>
      </div>
    );
  }

  if (spots.length === 0) {
    return (
      <div>
        <div>User has no spots.</div>
      </div>
    );
  }

  if (!spots) {
    return <h1></h1>;
  }

  const rating = (rating) => {
    if (rating < 1) {
      return <div>NEW</div>;
    } else return rating;
  };

  return (
    <div>
      <h1>Manage Spots</h1>
      <NavLink to="/spots/new">
        <button>Create a New Spot</button>
      </NavLink>
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <div key={error}>
              <div>{error}</div>
            </div>
          ))}
        </div>
      )}
      {errors.length === 0 && (
        <ul>
          {spots.map((spot) => (
            <li key={spot.id}>
              <NavLink to={`/spots/${spot.id}`}>
                <div>{spot.name}</div>
                <img src={`${spot.previewImage}`} alt="spotPreviewImage"></img>
                <div>
                  {spot.city}, {spot.state}
                </div>
                <div>{rating(spot.avgRating)}</div>
                <div>{`$${spot.price}`} night</div>
                <div></div>
              </NavLink>
              <div>
                <div>
                  <NavLink to={`/spots/${spot.id}/edit`}>
                    <button>Update</button>
                  </NavLink>
                </div>
                <div>
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteSpot spotId={spot.id} />}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageSpots;
