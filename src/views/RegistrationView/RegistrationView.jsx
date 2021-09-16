import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import { setErrors, setIsLoading } from '../../redux/actions';

import './RegistrationView.scss';

const RegistrationView = ({ history }) => {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  });

  const setUsername = (Username) => setNewUser({ ...newUser, Username });
  const setPassword = (Password) => setNewUser({ ...newUser, Password });
  const setEmail = (Email) => setNewUser({ ...newUser, Email });
  const setBirthday = (Birthday) => setNewUser({ ...newUser, Birthday });

  const {
    Username, Password, Email, Birthday,
  } = newUser;

  const registerFormRef = useRef();

  const isRegisterInputValid = () => registerFormRef.current.reportValidity();

  const registerUser = async () => {
    try {
      if (!newUser) {
        return;
      }

      dispatch(setIsLoading(true));

      const res = await fetch('https://dry-sands-45830.herokuapp.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.status === 201) {
        await res.json();

        dispatch(setErrors([]));
        history.push('/');
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        dispatch(setErrors([responseBodyText]));
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);
        dispatch(setErrors(errorMessages));
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterInputValid()) {
      registerUser(newUser);
    }
  };

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

RegistrationView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(RegistrationView);
