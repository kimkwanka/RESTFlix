import { useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { setErrors, setIsLoading } from '../../redux';

import './RegistrationView.scss';

const RegistrationView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const registerFormRef = useRef();

  const isRegisterInputValid = () => registerFormRef.current.reportValidity();

  const registerUser = async () => {
    try {
      if (!newUser) {
        return;
      }

      dispatch(setIsLoading(true));

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

        dispatch(setErrors([]));
        history.push('/');
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        dispatch(setErrors([responseBodyText]));
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);
        dispatch(setErrors(errorMessages));
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterInputValid()) {
      registerUser(newUser);
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
