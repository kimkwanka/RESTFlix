import { useState, useRef, useEffect, MouseEvent } from 'react';

import {
  useLoginUserMutation,
  useSilentLoginMutation,
} from '@features/slices/api';

const useLoginView = () => {
  const [loginUser] = useLoginUserMutation();
  const [silentLogin] = useSilentLoginMutation();

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
  useEffect(() => {
    silentLogin();

    return () => {};
  }, []);

  return {
    username,
    password,
    handleSubmit,
    setUsername,
    setPassword,
    loginFormRef,
    isDisabled,
  };
};

export default useLoginView;
