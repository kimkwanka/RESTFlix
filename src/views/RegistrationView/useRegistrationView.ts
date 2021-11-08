import { useState, useRef, MouseEvent } from 'react';

import { useHistory } from 'react-router-dom';

import { useAppDispatch } from '../../features/hooks';

import { registerUser } from '../../features/actions';

const RegistrationView = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
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
    isDisabled,
  };
};

export default RegistrationView;
