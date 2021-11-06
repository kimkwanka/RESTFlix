import { useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { registerUser } from '../../features';

const RegistrationView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: null,
  });

  const setUsername = (username) =>
    setNewUserData({ ...newUserData, username });
  const setPassword = (password) =>
    setNewUserData({ ...newUserData, password });
  const setEmail = (email) => setNewUserData({ ...newUserData, email });
  const setBirthday = (birthday) =>
    setNewUserData({ ...newUserData, birthday });

  const {
    username, password, email, birthday,
  } = newUserData;

  const registerFormRef = useRef();

  const isRegisterInputValid = () => registerFormRef.current.reportValidity();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegisterInputValid()) {
      try {
        await dispatch(registerUser(newUserData)).unwrap();

        history.push('/');
      } catch {
        // Error is dealt with inside registerUser thunk
        // but unwrap() bubbles it up again, so just catch and ignore it.
      }
    }
  };

  return {
    username,
    password,
    email,
    birthday,
    handleSubmit,
    setUsername,
    setPassword,
    setEmail,
    setBirthday,
    registerFormRef,
  };
};

export default RegistrationView;
