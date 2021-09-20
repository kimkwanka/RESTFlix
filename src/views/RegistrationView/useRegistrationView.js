import { useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { registerUser } from '../../redux';

import './RegistrationView.scss';

const RegistrationView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [newUserData, setnewUserData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  });

  const setUsername = (Username) => setnewUserData({ ...newUserData, Username });
  const setPassword = (Password) => setnewUserData({ ...newUserData, Password });
  const setEmail = (Email) => setnewUserData({ ...newUserData, Email });
  const setBirthday = (Birthday) => setnewUserData({ ...newUserData, Birthday });

  const {
    Username, Password, Email, Birthday,
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
    Username,
    Password,
    Email,
    Birthday,
    handleSubmit,
    setUsername,
    setPassword,
    setEmail,
    setBirthday,
    registerFormRef,
  };
};

export default RegistrationView;
