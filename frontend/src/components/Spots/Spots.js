import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../../store/spot";
import SpotDetails from "../SpotDetails/SpotDetails";
import { NavLink, Route, Switch } from "react-router-dom";

import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => state.spot.allSpots);
  const spots = Object.values(spotObj);


  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const rating = (rating) => {
    if (typeof rating === "string") {
      return "New"
    } else return <div>{Number(rating)}</div>;
  };

  return (
    <div className="all-home-spot-container">
      <div className="home-spot-container">
        {spots.map(
          ({ id, name, previewImage, city, state, price, avgRating }) => {
            return (
              <div className="div-for-Navlink">
                <NavLink
                  to={`/spots/${id}`}
                  className="all-spot-nav-link"
                  key={id}
                >
                  <img
                    src={previewImage}
                    alt={name}
                    className="all-spots-image"
                  />
                  <div className="home-spot-deatils">
                    <div className="home-spot-location-rating">
                      <div className="home-spot-location">
                        {city}, {state}
                      </div>
                      <div className="home-spot-rating">
                        {rating(avgRating)}
                      </div>
                    </div>
                    <div className="home-spot-price">${price} night</div>
                  </div>
                </NavLink>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Spots;
