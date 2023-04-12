import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginForms';
import SignupFormModal from '../SignupFormModal/SignupForm';


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
        {/* <NavLink to="/spots/new">Create New Spot</NavLink> */}
      </li>
      {isLoaded && (
        <li>
          <div>
            <NavLink exact to="/spots/new">Create New Spot</NavLink>
          </div>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
