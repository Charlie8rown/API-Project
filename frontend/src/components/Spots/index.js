import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { getSpot } from "../../store/spot";
import SpotDeatils from "../SpotDetails";

const Spots = () => {
  const dispatch = useDispatch()
  const spots = Object.values(useSelector(state => state.spot.entries))

  useEffect(() => {
    dispatch(getSpot())
  }, [dispatch])


  return (
    <div>
      <h1>Spot List</h1>
      <ol>
        {spots.map(({ id, name }) => {
          return (
            <li key={id}>
              <NavLink to={`/spots/${id}`}>{name}</NavLink>
            </li>
          )
        })}
      </ol>
      <Switch>
        <Route path="/spots/:id"><SpotDeatils spots={spots} /></Route>
      </Switch>
    </div>
  )
}

export default Spots
