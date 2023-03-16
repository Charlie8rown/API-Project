import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { getAllSpots } from "../../store/spot";
import SpotDetails from "../SpotInformation";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  if(!spots) {
    return null;
  }


  return (
  <div>
    <div>
    <img src={spots.previewImage} alt={spots.name}></img>
    <div>{spots.name}</div>
    <div>${spots.price} night</div>
    </div>
    {/* <Switch>
      <Route path='/spots/:id'>
        <SpotDetails spots={spots} />
      </Route>
    </Switch> */}
  </div>
)}

export default Spots
