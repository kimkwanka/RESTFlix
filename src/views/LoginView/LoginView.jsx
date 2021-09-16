/* eslint-disable no-underscore-dangle */
import React from 'react';

import { Link } from 'react-router-dom';

import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import useLoginView from './useLoginView';

import './LoginView.scss';

const LoginView = () => {
  const {
    username,
    password,
    handleSubmit,
    setUsername,
    setPassword,
    loginFormRef,
  } = useLoginView();

  return (
    <>
      <form
        className="d-flex flex-column align-items-center"
        ref={loginFormRef}
      >
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
      <p>
        Don’t have an account?
        <Link to="/register"> Sign up</Link>
      </p>
    </>
  );
};

export default LoginView;
