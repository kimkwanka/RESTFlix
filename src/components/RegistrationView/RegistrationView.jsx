import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ErrorMessages from '../ErrorMessages';

import * as actions from '../../redux/actions';

import './RegistrationView.scss';

import { useLoadingSpinner } from '../Hooks/useLoadingSpinnerContext';

const RegistrationView = ({ history, setErrors }) => {
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

  const [, setIsLoading] = useLoadingSpinner();

  const registerFormRef = useRef();

  const isRegisterInputValid = () => registerFormRef.current.reportValidity();

  const registerUser = async () => {
    try {
      if (!newUser) {
        return;
      }

      setIsLoading(true);

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

        setErrors([]);
        history.push('/');
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        setErrors([responseBodyText]);
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);

        setErrors(errorMessages);
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterInputValid()) {
      registerUser(newUser);
    }
  };

  return (
    <Form className="d-flex flex-column align-items-center" ref={registerFormRef}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" defaultValue={Username} onChange={(e) => setUsername(e.target.value)} required minLength="5" pattern="^[a-zA-Z0-9]+$" />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" defaultValue={Password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" defaultValue={Email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" defaultValue={Birthday} onChange={(e) => setBirthday(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary" onClick={handleSubmit}>Register</Button>
      <ErrorMessages />
    </Form>
  );
};

RegistrationView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, {
  setErrors: actions.setErrors,
})(withRouter(RegistrationView));
