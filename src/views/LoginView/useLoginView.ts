import { useState, useRef, MouseEvent } from 'react';

import { useLoginUserMutation } from '#state/slices/api';

const useLoginView = () => {
  const [loginUser, { error: loginError }] = useLoginUserMutation();

  const [username, setUsername] = useState('FlyingBanana');
  const [password, setPassword] = useState('test123');

  const loginFormRef = useRef<HTMLFormElement>(null);

  const isLoginFormInputValid = () => loginFormRef.current?.reportValidity();

  const isDisabled = !(username && password);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoginFormInputValid()) {
      loginUser({ username, password });
    }
  };

  return {
    username,
    password,
    handleSubmit,
    setUsername,
    setPassword,
    loginFormRef,
    isDisabled,
    loginError,
  };
};

export default useLoginView;
