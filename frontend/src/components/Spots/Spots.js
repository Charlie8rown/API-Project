import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getSpots } from "../../store/spot";
import SpotDetails from "../SpotDetails/SpotDetails";
import { NavLink, Route, Switch } from "react-router-dom"
import "./Spots.css";


const Spots = () => {
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => state.spot.allSpots);
  const spots = Object.values(spotObj);
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="cards-div">
      {spots.map(({ id, name, previewImage, city, state, price }) => {
        return (
          <NavLink to={`/spots/${id}`} className="spot-nav-link" key={id}>
            <img src={previewImage} alt={name} className="img" />
            <div>
              <p>
                {city}, {state}
              </p>
            </div>
            <p>${price} night</p>
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
