import { useState, useRef, useEffect, MouseEvent } from 'react';

import { useAppDispatch } from '@features/hooks';

import { loginUser, silentRefresh } from '@features/actions';

const useLoginView = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('FlyingBanana');
  const [password, setPassword] = useState('test123');

  const loginFormRef = useRef<HTMLFormElement>(null);

  const isLoginFormInputValid = () => loginFormRef.current?.reportValidity();

  const isDisabled = !(username && password);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoginFormInputValid()) {
      dispatch(loginUser({ username, password }));
    }
  };
  useEffect(() => {
    dispatch(silentRefresh());

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
