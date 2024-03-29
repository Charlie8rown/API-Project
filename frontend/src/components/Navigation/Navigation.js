import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-bar">
      <div className="Banner">
        <NavLink className="logo" exact to="/">
          SleepN
        </NavLink>
      </div>
      <div className="create">
        {sessionUser ? (
          <NavLink className="create-button" to="/spots/new">
            Create a New Spot
          </NavLink>
        ) : null}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </ul>
  );
}

export default Navigation;
