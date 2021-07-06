import React, { useState } from 'react';

import './LoginView.scss';

import { useStoreContext } from '../Store';

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
    <form id="login-form">
      <label htmlFor="login-username">
        Username:
        <input id="login-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label htmlFor="login-password">
        Password:
        <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
    </form>
  );
};

export default LoginView;
