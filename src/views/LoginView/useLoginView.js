/* eslint-disable no-underscore-dangle */
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
  setUser,
  setToken,
  setErrors,
  setIsLoading,
} from '../../redux/actions';

import './LoginView.scss';

const saveToLocalStorage = ({ user, token }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const useLoginView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('NewTestUser3');
  const [password, setPassword] = useState('test123');

  const loginFormRef = useRef();

  const isLoginFormInputValid = () => loginFormRef.current.reportValidity();

  const checkLogin = async () => {
    try {
      dispatch(setIsLoading(true));

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/login?Username=${username}&Password=${password}`,
        {
          method: 'POST',
          headers: {},
        },
      );

      if (res.status === 200) {
        const { user, token } = await res.json();

        dispatch(setUser(user));
        dispatch(setToken(token));
        dispatch(setErrors([]));
        saveToLocalStorage({ user, token });

        history.push('/');
      } else {
        const loginError = await res.text();

        dispatch(setErrors([loginError]));
        console.error(loginError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginFormInputValid()) {
      checkLogin();
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
