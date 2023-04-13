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
    <div className="cards-div">
      {spots.map(({ id, name, previewImage, city, state, price, avgRating }) => {
        return (
          <NavLink to={`/spots/${id}`} className="spot-nav-link" key={id}>
            <img src={previewImage} alt={name} className="img" />
            <div>
              <div>
                {city}, {state}
              </div>
              <div>{rating(avgRating)}</div>
            </div>
            <div>${price} night</div>
          </NavLink>
        );
      })}

      <Switch>
        <Route path="/spots/:id">
          <SpotDetails spots={spots} />
        </Route>
      </Switch>
    </div>
  );
};

export default Spots;
