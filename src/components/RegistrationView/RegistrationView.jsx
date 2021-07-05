import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './RegistrationView.scss';

const registerUser = async (newUser, onRegister, onRegisterError) => {
  try {
    if (!newUser) {
      return;
    }

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
      onRegister();
    }

    if (res.status === 400) {
      const responseBodyText = await res.text();
      onRegisterError([responseBodyText]);
      console.error(responseBodyText);
    }

    if (res.status === 422) {
      const responseBody = await res.json();
      onRegisterError(responseBody.errors);
      console.error(responseBody.errors);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = (e, newUser, onRegister, onRegisterError) => {
  e.preventDefault();
  registerUser(newUser, onRegister, onRegisterError);
};

const RegistrationView = ({ onRegister, onRegisterError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  return (
    <form id="register-form">
      <label htmlFor="register-username">
        Username:
        <input id="register-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label htmlFor="register-password">
        Password:
        <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label htmlFor="register-email">
        Email:
        <input id="register-email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="register-birthday">
        Birthday:
        <input id="register-birthday" type="text" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="06/11/1973" />
      </label>
      <button
        type="submit"
        onClick={(e) => handleSubmit(e, {
          Username: username, Password: password, Email: email, Birthday: birthday,
        }, onRegister, onRegisterError)}
      >
        Register
      </button>
    </form>
  );
};

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onRegisterError: PropTypes.func.isRequired,
};

export default RegistrationView;
