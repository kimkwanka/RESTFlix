import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './LoginView.scss';

const checkLogin = async (username, password, onLoggedIn) => {
  try {
    const res = await fetch(`https://dry-sands-45830.herokuapp.com/login?Username=${username}&Password=${password}`, {
      method: 'POST',
      headers: {},
    });

    if (res.status === 200) {
      const { user, token } = await res.json();

      onLoggedIn(user, token);
    } else {
      const loginError = await res.text();

      console.error(loginError);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = (e, username, password, onLoggedIn) => {
  e.preventDefault();
  checkLogin(username, password, onLoggedIn);
};

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('NewTestUser3');
  const [password, setPassword] = useState('test123');

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
      <button className="login-button" type="submit" onClick={(e) => handleSubmit(e, username, password, onLoggedIn)}>Submit</button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
