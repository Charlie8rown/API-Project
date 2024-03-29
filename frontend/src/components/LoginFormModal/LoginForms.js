import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [login, setLogin] = useState();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          const errors = Object.values(data.message)
          return setErrors(errors)
        }
      );
  };

  const disabledButton = () => {
    if (!credential.length || !password.length) {
      return true;
    } else if (credential.length < 4 || password.length < 6) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!credential.length || !password.length) {
      setLogin('login-disabled')
    }
    else if (credential.length < 4 || password.length < 6) {
      setLogin('login-disabled')
    } else {
      setLogin('login-enabled')
    }
  }, [credential, password])



  return (
    <div className='login-outer-container'>
      <h1 className='login'>Log In</h1>
      <form className='login-inner-container' onSubmit={handleSubmit}>
        <ul className='errors'>
          {errors}
        </ul>
        <input
          type="text"
          className='login-form-input'
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          className='login-form-input'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className='login-button' id={login} type="submit" disabled={disabledButton()}>Log In</button>
        <button className="DemoUserButton" onClick={() => dispatch(sessionActions.login({credential: "Demo-lition", password: "password"})).then(closeModal) }>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
