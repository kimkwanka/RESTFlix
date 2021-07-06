import React, { useState } from 'react';

import './RegistrationView.scss';

import { useStoreContext } from '../Store';

const RegistrationView = () => {
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

  const registerUser = async () => {
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
        setStoreState({ ...storeState, route: '/', errorMessages: [] });
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();
        setStoreState({ ...storeState, errorMessages: [responseBodyText] });
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        setStoreState({ ...storeState, errorMessages: responseBody.errors });
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(newUser);
  };

  return (
    <form id="register-form">
      <label htmlFor="register-username">
        Username:
        <input id="register-username" type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label htmlFor="register-password">
        Password:
        <input id="register-password" type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label htmlFor="register-email">
        Email:
        <input id="register-email" type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="register-birthday">
        Birthday:
        <input id="register-birthday" type="text" value={Birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="06/11/1973" />
      </label>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Register</button>
    </form>
  );
};

export default RegistrationView;
