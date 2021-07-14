import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

import ErrorMessages from '../ErrorMessages';
import LoadingSpinner from '../LoadingSpinner';

import './RegistrationView.scss';

import { useStoreContext } from '../Store';

const RegistrationView = ({ history }) => {
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

  const [storeState, setStoreState] = useStoreContext();

  const [isRegistering, setIsRegistering] = useState(false);

  const registerUser = async () => {
    try {
      if (!newUser) {
        return;
      }

      setIsRegistering(true);

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

        setStoreState({ ...storeState, errorMessages: [] });
        history.push('/');
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        setStoreState({ ...storeState, errorMessages: [responseBodyText] });
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);

        setStoreState({ ...storeState, errorMessages });
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(newUser);
  };

  return (
    <Form className="d-flex flex-column align-items-center">
      <LoadingSpinner isLoading={isRegistering} />
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" defaultValue={Username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" defaultValue={Password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" defaultValue={Email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="text" defaultValue={Birthday} onChange={(e) => setBirthday(e.target.value)} />
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

export default withRouter(RegistrationView);
