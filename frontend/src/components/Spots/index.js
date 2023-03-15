import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { getSpot } from "../../store/spot";
import SpotDetails from "../SpotDetails";
import "./spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotObj = useSelector(state => state.spot.allSpots);
  const spots = Object.values(spotObj);

  useEffect(() => {
    dispatch(getSpot())
  }, [dispatch])


  return (
    <div>
      {spots.map(({ id, name, previewImage, city, state, price, avgRating }) => {
        let rating = 5;
        if (!isNaN(avgRating)) {
          rating = Math.round(Number(avgRating) * 1000) / 1000;
        }
        let ratingString = rating.toFixed(2);
        return (
          <div key={id}>
            <div>
              <NavLink to={`/spots/${id}`} >
                <div>
                  <img src={previewImage} alt={name} />
                    <div>
                      <p>{city}, {state}</p>
                      <p>{ratingString}</p>
                    </div>
                  <p>${price} night</p>
                </div>
              </NavLink>
            </div>
          </div>
        )
      })}
    <Switch>
      <Route path='/spots/:id'>
        <SpotDetails spots={spots} />
      </Route>
    </Switch>
  </div>
)}

export default Spots
