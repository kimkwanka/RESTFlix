import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './LoginView.scss';

import { useStoreContext } from '../Store';

const saveToLocalStorage = ({ user, token }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', user);
};

const LoginView = () => {
  const [username, setUsername] = useState('NewTestUser3');
  const [password, setPassword] = useState('test123');

  const [storeState, setStoreState] = useStoreContext();

  const checkLogin = async () => {
    try {
      const res = await fetch(`https://dry-sands-45830.herokuapp.com/login?Username=${username}&Password=${password}`, {
        method: 'POST',
        headers: {},
      });

      if (res.status === 200) {
        const { user, token } = await res.json();

        setStoreState({
          ...storeState, user, token, route: '/movies', errorMessages: [],
        });

        saveToLocalStorage({ user, token });
      } else {
        const loginError = await res.text();

        setStoreState({ ...storeState, errorMessages: [loginError] });
        console.error(loginError);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkLogin();
  };

  return (
    <Form className="d-flex flex-column align-items-center">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary" onClick={handleSubmit}>Login</Button>
    </Form>
  );
};

export default LoginView;
