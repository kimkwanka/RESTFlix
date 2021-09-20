/* eslint-disable no-underscore-dangle */
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux';

import './LoginView.scss';

const saveToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const useLoginView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('NewTestUser3');
  const [password, setPassword] = useState('test123');

  const loginFormRef = useRef();

  const isLoginFormInputValid = () => loginFormRef.current.reportValidity();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginFormInputValid()) {
      try {
        const { user, token } = await dispatch(loginUser({ username, password })).unwrap();

        history.push('/');
        saveToLocalStorage({ data: user, token });
      } catch {
        // Error is dealt with inside loginUser thunk
        // but unwrap() bubbles it up again, so just catch and ignore it.
      }
    }
  };

  return {
    username,
    password,
    handleSubmit,
    setUsername,
    setPassword,
    loginFormRef,
  };
};

export default useLoginView;
