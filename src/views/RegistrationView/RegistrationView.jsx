import React from 'react';

import { Link } from 'react-router-dom';

import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import useRegistrationView from './useRegistrationView';

import './RegistrationView.scss';

const RegistrationView = () => {
  const {
    Username,
    Password,
    Email,
    Birthday,
    handleSubmit,
    setUsername,
    setPassword,
    setEmail,
    setBirthday,
    registerFormRef,
  } = useRegistrationView();

  return (
    <>
      <form
        className="d-flex flex-column align-items-center"
        ref={registerFormRef}
      >
        <label htmlFor="formUsername">
          Username:
          <input
            id="formUsername"
            type="text"
            defaultValue={Username}
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
            defaultValue={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="formEmail">
          Email:
          <input
            id="formEmail"
            type="email"
            defaultValue={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="formBirthday">
          Birthday:
          <input
            id="formBirthday"
            type="date"
            defaultValue={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button type="submit" variant="primary" onClick={handleSubmit}>
          Register
        </button>
        <ErrorMessages />
      </form>
      <p>
        Already have an account?
        <Link to="/login"> Sign in</Link>
      </p>
    </>
  );
};

export default RegistrationView;
