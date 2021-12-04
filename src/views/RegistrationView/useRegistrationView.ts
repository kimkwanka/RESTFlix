import { useState, useRef, MouseEvent } from 'react';

import { useHistory } from 'react-router-dom';

import { useRegisterUserMutation } from '@features/slices/api';

const RegistrationView = () => {
  const [registerUser] = useRegisterUserMutation();

  const history = useHistory();
  const registerFormRef = useRef<HTMLFormElement>(null);

  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: '',
  });

  const setUsername = (username: string) =>
    setNewUserData({ ...newUserData, username });
  const setPassword = (password: string) =>
    setNewUserData({ ...newUserData, password });
  const setEmail = (email: string) => setNewUserData({ ...newUserData, email });
  const setBirthday = (birthday: string) =>
    setNewUserData({ ...newUserData, birthday });

  const { username, password, email, birthday } = newUserData;

  const isRegisterInputValid = () => registerFormRef.current?.reportValidity();

  const isDisabled = !(username && password && email);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isRegisterInputValid()) {
      await registerUser(newUserData);
      history.push('/');
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
    isDisabled,
  };
};

export default RegistrationView;
