/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import ErrorMessages from '../ErrorMessages';

import * as actions from '../../redux/actions';

import './LoginView.scss';

import { useLoadingSpinner } from '../Hooks/useLoadingSpinnerContext';

const saveToLocalStorage = ({ user, token }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const LoginView = ({
  history, setLoggedInUser, setJWTToken, setErrors,
}) => {
  const [username, setUsername] = useState('NewTestUser3');
  const [password, setPassword] = useState('test123');

  const [, setIsLoading] = useLoadingSpinner();

  const loginFormRef = useRef();

  const isLoginFormInputValid = () => loginFormRef.current.reportValidity();

  const checkLogin = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/login?Username=${username}&Password=${password}`,
        {
          method: 'POST',
          headers: {},
        },
      );

      if (res.status === 200) {
        const { user, token } = await res.json();

        setLoggedInUser(user);
        setJWTToken(token);
        setErrors([]);
        saveToLocalStorage({ user, token });

        history.push('/movies');
      } else {
        const loginError = await res.text();
        setErrors([loginError]);
        console.error(loginError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginFormInputValid()) {
      checkLogin();
    }
  };

  return (
    <form className="d-flex flex-column align-items-center" ref={loginFormRef}>
      <label htmlFor="formUsername">
        Username:
        <input
          id="formUsername"
          type="text"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          pattern="^[a-zA-Z0-9]+$"
        />
      </label>
      <label htmlFor="formPassword">
        Password:
        <input
          id="formPassword"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" variant="primary" onClick={handleSubmit}>
        Login
      </button>
      <ErrorMessages />
    </form>
  );
};

LoginView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  (store) => ({
    loggedInUser: store.user,
    jwtToken: store.token,
  }),
  {
    setLoggedInUser: actions.setUser,
    setJWTToken: actions.setToken,
    setErrors: actions.setErrors,
  },
)(withRouter(LoginView));
