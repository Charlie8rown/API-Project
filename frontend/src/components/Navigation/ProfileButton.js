import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal/LoginForms';
import SignupFormModal from '../SignupFormModal/SignupForm';
import CreateSpot from "../CreateSpot/CreateSpot";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = (e) => {
    setShowMenu(false)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="user-button" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button id="logout" onClick={logout}>Log Out</button>
            </li>
            <li>
              <NavLink to='/addSpotForm'
              onClick={closeMenu}
              >List a spot</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="profile-item">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className="profile-item">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li className="profile-item">
              <button onClick={demoLogin}>Demo Login</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
