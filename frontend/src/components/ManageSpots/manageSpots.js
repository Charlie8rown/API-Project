import React, { useEffect, useState } from "react";
import { currUserSpots } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DeleteSpot } from "../DeleteSpot/deletespot";
import OpenModalButton from "../OpenModalButton/index";
import "./ManageSpots.css";
import SpotDetail from "../SpotDetails/SpotDetails";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spot?.allUserSpots));
  // const userSpots = useSelector((State) => State.spot.allUserSpots);
  // const spots = Object.values(userSpots);
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(currUserSpots(user.id));
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
    return <h1>"User has no spots"</h1>;
  }

  const rating = (rating) => {
    if (rating < 1) {
      return <div>NEW</div>;
    } else return rating;
  };

  return (
    <div className="manage-page">
      <div className="title-create-container">
        <h1>Manage Spots</h1>
        <div className="Manage-create-spot-button">
          <NavLink to="/spots/new">
            <button>Create a New Spot</button>
          </NavLink>
        </div>
      </div>
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
        <ul className="manage-spot-list">
          {spots.map((spot) => (
            <li key={spot.id}>
              <NavLink to={`/spots/${spot.id}`}>
                <img src={`${spot.previewImage}`} alt="spotPreviewImage"></img>
                <div className="manage-spot-info">
                  <div className="manage-spot-location">
                    {spot.city}, {spot.state}
                  </div>
                  <div className="manage-spot-price">{`$${spot.price}`} night</div>
                </div>
              </NavLink>
              <div className="manage-actions">
                <NavLink to={`/spots/${spot.id}/edit`}>

                <button>Update</button>
                </NavLink>
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteSpot spotId={spot.id} />}
                  />
              </div>
              <div className="manage-rating">{rating(spot.avgRating)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageSpots;
