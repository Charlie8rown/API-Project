import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpot from '../CreateSpot';
import OpenModalMenuItem from './OpenModalMenuItem';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLink;

  if (sessionUser) {
    sessionLink = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLink = (
      <li>
        <OpenModalButton className="ModalButton" buttonText="Log In" modalComponent={<LoginFormModal />} />
        <OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />} />
      </li>
    );
  }


  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          {/* <NavLink to="/spots/new">Add a Spot</NavLink> */}
          {/* <ProfileButton user={sessionUser} /> */}
          <NavLink to="/spots/new">Add a Spot</NavLink> {isLoaded && (<ProfileButton user={sessionUser} />)}
        </li>
      )}
    </ul>
  );
}

export default Navigation;
