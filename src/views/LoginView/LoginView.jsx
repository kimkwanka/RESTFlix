/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import {
  setUser, setToken, setErrors, setIsLoading,
} from '../../redux/actions';

import './LoginView.scss';

const saveToLocalStorage = ({ user, token }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const LoginView = ({ history }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('NewTestUser3');
  const [password, setPassword] = useState('test123');

  const loginFormRef = useRef();

  const isLoginFormInputValid = () => loginFormRef.current.reportValidity();

  const checkLogin = async () => {
    try {
      dispatch(setIsLoading(true));

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/login?Username=${username}&Password=${password}`,
        {
          method: 'POST',
          headers: {},
        },
      );

      if (res.status === 200) {
        const { user, token } = await res.json();

        dispatch(setUser(user));
        dispatch(setToken(token));
        dispatch(setErrors([]));
        saveToLocalStorage({ user, token });

        history.push('/');
      } else {
        const loginError = await res.text();

        dispatch(setErrors([loginError]));
        console.error(loginError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
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

export default withRouter(LoginView);
